import { Request, Response } from 'express';
import { Client } from 'pg';

interface Car {
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

export const register = async (req: Request, res: Response) => {
    const { licensePlate, color, brand } = req.body;

    try {
        const checkDuplicate = await client.query('SELECT * FROM cars WHERE license_plate = $1', [licensePlate]);

        if (checkDuplicate.rows.length > 0) {
            return res.status(400).json({ error: 'Placa já cadastrada.' });
        }

        const result = await client.query(
            'INSERT INTO cars (license_plate, color, brand) VALUES ($1, $2, $3) RETURNING *',
            [licensePlate, color, brand]
        );

        const newCar: Car = result.rows[0];
        return res.status(201).json(newCar);
    } catch (error) {
        console.error('Erro ao cadastrar carro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const update = async (req: Request, res: Response) => {
    const { licensePlate } = req.params;
    const { color, brand } = req.body;

    try {
        const checkExistence = await client.query('SELECT * FROM cars WHERE license_plate = $1', [licensePlate]);

        if (checkExistence.rows.length === 0) {
            return res.status(404).json({ error: 'Carro não encontrado.' });
        }

        const result = await client.query(
            'UPDATE cars SET color = $1, brand = $2 WHERE license_plate = $3 RETURNING *',
            [color, brand, licensePlate]
        );

        const updatedCar: Car = result.rows[0];
        return res.json(updatedCar);
    } catch (error) {
        console.error('Erro ao atualizar carro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const deleteCar = async (req: Request, res: Response) => {
    const { licensePlate } = req.params;

    try {
        const checkExistence = await client.query('SELECT * FROM cars WHERE license_plate = $1', [licensePlate]);

        if (checkExistence.rows.length === 0) {
            return res.status(404).json({ error: 'Carro não encontrado.' });
        }

        const result = await client.query(
            'DELETE FROM cars WHERE license_plate = $1 RETURNING *',
            [licensePlate]
        );

        const deletedCar: Car = result.rows[0];
        return res.json(deletedCar);
    } catch (error) {
        console.error('Erro ao deletar carro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const get = async (req: Request, res: Response) => {
    const { licensePlate } = req.params;

    try {
        const result = await client.query('SELECT * FROM cars WHERE license_plate = $1', [licensePlate]);

        const car: Car = result.rows[0];
        if (!car) {
            return res.status(404).json({ error: 'Carro não encontrado.' });
        }

        return res.json(car);
    } catch (error) {
        console.error('Erro ao recuperar carro:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const list = async (req: Request, res: Response) => {
    const { color, brand } = req.query;

    try {
        let query = 'SELECT * FROM cars';

        /*
        const conditions = [];
        if (color) conditions.push(`color = '${color}'`);
        if (brand) conditions.push(`brand = '${brand}'`);

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        */

        const result = await client.query(query);

        const cars: Car[] = result.rows;
        return res.json(cars);
    } catch (error) {
        console.error('Erro ao listar carros:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};