import { Request, Response } from 'express';
import CarUsageService from '../services/carUsageService';

export const registerUsage = async (req: Request, res: Response): Promise<void> => {
    const { startDate, driverId, carId, reason } = req.body;

    try {
        const newCarUsage = await CarUsageService.registerUsage(startDate, driverId, carId, reason);
        res.status(201).json(newCarUsage);
    } catch (error: any) {
        console.error('Erro ao criar registro de utilização:', error.message);
        res.status(400).json({ error: error.message });
    }
};

export const finishUsage = async (req: Request, res: Response): Promise<void> => {
    const { carUsageId } = req.params;
    const { endDate } = req.body;

    try {
        const finishedCarUsage = await CarUsageService.finishUsage(parseInt(carUsageId, 10), endDate);
        res.json(finishedCarUsage);
    } catch (error: any) {
        console.error('Erro ao finalizar registro de utilização:', error.message);
        res.status(400).json({ error: error.message });
    }
};

export const listUsage = async (req: Request, res: Response): Promise<void> => {
    try {
        const carUsages = await CarUsageService.listUsages();
        res.json(carUsages);
    } catch (error: any) {
        console.error('Erro ao listar registros de utilização:', error.message);
        res.status(400).json({ error: error.message });
    }
};

