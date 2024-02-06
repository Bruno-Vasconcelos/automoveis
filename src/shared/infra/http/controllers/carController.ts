import { Request, Response } from 'express';
import CarService from '../services/carService';

export const register = async (req: Request, res: Response): Promise<any> => {
    const { licensePlate, color, brand } = req.body;

    try {
        const newCar = await CarService.registerCar(licensePlate, color, brand);
        res.status(201).json(newCar);
    } catch (error: any) {
        console.error('Erro ao cadastrar carro:', error.message);
        res.status(400).json({ error: error.message });
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const { licensePlate } = req.params;
    const { color, brand } = req.body;

    try {
        const updatedCar = await CarService.updateCar(licensePlate, color, brand);
        res.json(updatedCar);
    } catch (error: any) {
        console.error('Erro ao atualizar carro:', error.message);
        res.status(400).json({ error: error.message });
    }
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
    const { licensePlate } = req.params;

    try {
        const deletedCar = await CarService.deleteCar(licensePlate);
        res.json(deletedCar);
    } catch (error: any) {
        console.error('Erro ao deletar carro:', error.message);
        res.status(400).json({ error: error.message });
    }
};

export const get = async (req: Request, res: Response): Promise<any> => {
    const { licensePlate } = req.params;

    try {
        const car = await CarService.getCar(licensePlate);
        res.json(car);
    } catch (error: any) {
        console.error('Erro ao recuperar carro:', error.message);
        res.status(400).json({ error: error.message });
    }
};

export const list = async (req: Request, res: Response): Promise<void> => {
    try {
        const cars = await CarService.listCars();
        res.json(cars);
    } catch (error: any) {
        console.error('Erro ao listar carros:', error.message);
        res.status(400).json({ error: error.message });
    }
};
