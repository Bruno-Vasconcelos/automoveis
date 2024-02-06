import CarUsageRepository from '../repositories/carUsageRepository';
import { CarUsage } from '../models/carUsageModel';

class CarUsageService {
    public async registerUsage(startDate: string, driverId: number, carId: number, reason: string): Promise<CarUsage> {
        const activeDriverUsage = await CarUsageRepository.findActiveDriverUsage(driverId);

        if (activeDriverUsage) {
            throw new Error('O motorista já está utilizando um carro.');
        }

        const activeCarUsage = await CarUsageRepository.findActiveCarUsage(carId);

        if (activeCarUsage) {
            throw new Error('O carro já está em uso.');
        }

        return CarUsageRepository.createUsage(startDate, driverId, carId, reason);
    }

    public async finishUsage(carUsageId: number, endDate: string): Promise<CarUsage | null> {
        const usage = await CarUsageRepository.finishUsage(carUsageId, endDate);

        if (!usage) {
            throw new Error('Registro de utilização não encontrado ou já finalizado.');
        }

        return usage;
    }

    public async listUsages(): Promise<CarUsage[]> {
        return CarUsageRepository.listUsages();
    }
}

export default new CarUsageService();
