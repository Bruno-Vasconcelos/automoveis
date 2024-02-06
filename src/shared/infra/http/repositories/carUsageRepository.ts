// repositories/carUsageRepository.ts

import { Client } from 'pg';
import { CarUsage } from '../models/carUsageModel';

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'test_seidor',
//     password: 'postgre',
//     port: 5432,
// });

import PGClient from '../../../../pg-cliente';

const client = PGClient.getInstance();

class CarUsageRepository {
    public async findActiveDriverUsage(driverId: number): Promise<CarUsage | null> {
        const result = await client.query(
            'SELECT * FROM car_usages WHERE driver_id = $1 AND end_date IS NULL',
            [driverId]
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    public async findActiveCarUsage(carId: number): Promise<CarUsage | null> {
        const result = await client.query(
            'SELECT * FROM car_usages WHERE automobile_id = $1 AND end_date IS NULL',
            [carId]
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    public async createUsage(startDate: string, driverId: number, carId: number, reason: string): Promise<CarUsage> {
        const result = await client.query(
            'INSERT INTO car_usages (start_date, driver_id, automobile_id, reason) VALUES ($1, $2, $3, $4) RETURNING *',
            [startDate, driverId, carId, reason]
        );
        return result.rows[0];
    }

    public async finishUsage(carUsageId: number, endDate: string): Promise<CarUsage | null> {
        const result = await client.query(
            'UPDATE car_usages SET end_date = $1 WHERE id = $2 RETURNING *',
            [endDate, carUsageId]
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    public async listUsages(): Promise<CarUsage[]> {
        const result = await client.query(
            'SELECT u.id, u.start_date, u.end_date, u.reason, d.name AS driver_name, c.license_plate, c.color, c.brand FROM car_usages u JOIN drivers d ON u.driver_id = d.id JOIN cars c ON u.automobile_id = c.id'
        );
        return result.rows;
    }
}

export default new CarUsageRepository();
