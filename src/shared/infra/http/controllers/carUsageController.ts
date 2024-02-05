import { Request, Response } from 'express';
import { Client } from 'pg';

interface CarUsage {
    id: number;
    start_date: string;
    end_date: string | null;
    reason: string;
    driver_name: string;
    license_plate: string;
    color: string;
    brand: string;
}

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test_seidor',
    password: 'postgre',
    port: 5432,
});

client.connect();

export const registerUsage = async (req: Request, res: Response) => {
    const { startDate, driverId, carId, reason } = req.body;

    try {
        const checkDriverUsage = await client.query(
            'SELECT * FROM car_usages WHERE driver_id = $1 AND end_date IS NULL',
            [driverId]
        );

        if (checkDriverUsage.rows.length > 0) {
            return res.status(400).json({ error: 'O motorista já está utilizando um carro.' });
        }

        const checkCarUsage = await client.query(
            'SELECT * FROM car_usages WHERE automobile_id = $1 AND end_date IS NULL',
            [carId]
        );

        if (checkCarUsage.rows.length > 0) {
            return res.status(400).json({ error: 'O carro já está em uso.' });
        }

        const result = await client.query(
            'INSERT INTO car_usages (start_date, driver_id, automobile_id, reason) VALUES ($1, $2, $3, $4) RETURNING *',
            [startDate, driverId, carId, reason]
        );

        const newCarUsage: CarUsage = result.rows[0];
        return res.status(201).json(newCarUsage);
    } catch (error) {
        console.error('Erro ao criar registro de utilização:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const finishUsage = async (req: Request, res: Response) => {
    const { carUsageId } = req.params;
    const { endDate } = req.body;

    try {
        const checkUsage = await client.query(
            'SELECT * FROM car_usages WHERE id = $1 AND end_date IS NULL',
            [carUsageId]
        );

        if (checkUsage.rows.length === 0) {
            return res.status(404).json({ error: 'Registro de utilização não encontrado ou já finalizado.' });
        }

        const result = await client.query(
            'UPDATE car_usages SET end_date = $1 WHERE id = $2 RETURNING *',
            [endDate, carUsageId]
        );

        const finishedCarUsage: CarUsage = result.rows[0];
        return res.json(finishedCarUsage);
    } catch (error) {
        console.error('Erro ao finalizar registro de utilização:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const listUsage = async (req: Request, res: Response) => {
    try {
        const result = await client.query(
            'SELECT u.id, u.start_date, u.end_date, u.reason, d.name AS driver_name, c.license_plate, c.color, c.brand FROM car_usages u JOIN drivers d ON u.driver_id = d.id JOIN cars c ON u.automobile_id = c.id'
        );

        const carUsages: CarUsage[] = result.rows;
        return res.json(carUsages);
    } catch (error) {
        console.error('Erro ao listar registros de utilização:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};
