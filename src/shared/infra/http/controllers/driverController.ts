import { Request, Response } from 'express';
import DriverService from '../services/driverService';
import { Driver } from '../models/driverModel';
export const registerDriver = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.body;

    try {
        const result = await DriverService.registerDriver(name);
        const newDriver = result as Driver;
        res.status(201).json(newDriver);
    } catch (error: any) {
        console.error('Erro ao cadastrar motorista:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const updateDriver = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const result = await DriverService.updateDriver(id, name);
        const updatedDriver = result as Driver;

        if (!updatedDriver) {
            res.status(404).json({ error: 'Motorista não encontrado.' });
            return;
        }

        res.json(updatedDriver);
    } catch (error: any) {
        console.error('Erro ao atualizar motorista:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const deleteDriver = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await DriverService.deleteDriver(id);
        const deletedDriver = result as Driver;

        if (!deletedDriver) {
            res.status(404).json({ error: 'Motorista não encontrado.' });
            return;
        }

        res.json(deletedDriver);
    } catch (error: any) {
        console.error('Erro ao excluir motorista:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const getDriver = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await DriverService.getDriver(id);
        const driver = result as Driver;

        if (!driver) {
            res.status(404).json({ error: 'Motorista não encontrado.' });
            return;
        }

        res.json(driver);
    } catch (error: any) {
        console.error('Erro ao recuperar motorista:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

export const listDrivers = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.query;

    try {
        const result = await DriverService.listDrivers(name as string);
        const drivers = result as Driver[];

        res.json(drivers);
    } catch (error: any) {
        console.error('Erro ao listar motoristas:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

