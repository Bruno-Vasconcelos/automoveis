import DriverRepository from '../repositories/driverRepository';
import { QueryResult } from 'pg';
import { Driver } from '../models/driverModel';

class DriverService {
    public async registerDriver(name: string): Promise<Driver> {
        return DriverRepository.createDriver(name);
    }

    public async updateDriver(id: string, name: string): Promise<Driver | null> {
        const result = await DriverRepository.updateDriver(id, name); 
        if (!result){
            throw new Error('Motorista não encontrado.');
        }
        return result
    }

    public async deleteDriver(id: string): Promise<Driver | null> {
        const result = await DriverRepository.deleteDriver(id);
        if (!result){
            throw new Error('Motorista não encontrado.');
        }
        return result
    }

    public async getDriver(id: string): Promise<Driver | null> {
        const result = await DriverRepository.getDriver(id);
        return result
    }

    public async listDrivers(name?: string): Promise<Driver[]> {
        return await DriverRepository.listDrivers(name);
    }
}

export default new DriverService();
