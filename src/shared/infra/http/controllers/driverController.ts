import { Request, Response } from 'express';
import { Client, QueryResult } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test_seidor',
    password: 'postgre',
    port: 5432,
});

client.connect();

// Cadastra motorista
export const registerDriver = async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const result: QueryResult = await client.query(
            'INSERT INTO drivers (name) VALUES ($1) RETURNING *',
            [name]
        );

        const newDriver = result.rows[0];
        return res.status(201).json(newDriver);
    } catch (error) {
        console.error('Erro ao cadastrar motorista:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Atualizar motorista
export const updateDriver = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const result: QueryResult = await client.query(
            'UPDATE drivers SET name = $1 WHERE id = $2 RETURNING *',
            [name, id]
        );

        const updatedDriver = result.rows[0];

        if (!updatedDriver) {
            return res.status(404).json({ error: 'Motorista não encontrado.' });
        }

        return res.json(updatedDriver);
    } catch (error) {
        console.error('Erro ao atualizar motorista:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Deletar Motorista
export const deleteDriver = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result: QueryResult = await client.query('DELETE FROM drivers WHERE id = $1 RETURNING *', [id]);

        const deletedDriver = result.rows[0];

        if (!deletedDriver) {
            return res.status(404).json({ error: 'Motorista não encontrado.' });
        }

        return res.json(deletedDriver);
    } catch (error) {
        console.error('Erro ao excluir motorista:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Retorna motorista
export const getDriver = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result: QueryResult = await client.query('SELECT * FROM drivers WHERE id = $1', [id]);

        const driver = result.rows[0];

        if (!driver) {
            return res.status(404).json({ error: 'Motorista não encontrado.' });
        }

        return res.json(driver);
    } catch (error) {
        console.error('Erro ao recuperar motorista:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

// Lista motoristas
export const listDrivers = async (req: Request, res: Response) => {
    const { name } = req.query;

    try {
        let query = 'SELECT * FROM drivers';

        if (name) {
            query += ` WHERE name = '${name}'`;
        }

        const result: QueryResult = await client.query(query);
        const drivers = result.rows;

        return res.json(drivers);
    } catch (error) {
        console.error('Erro ao listar motoristas:', error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};