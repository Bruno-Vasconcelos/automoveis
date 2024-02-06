// repositories/carRepository.ts

import { Client } from 'pg';
import { Car } from '../models/carModel'; 
import PGClient from '../../../../pg-cliente';

const client = PGClient.getInstance();

class CarRepository { 
    public async findByLicensePlate(licensePlate: string): Promise<Car | null> {
        const result = await client.query('SELECT * FROM cars WHERE license_plate = $1', [licensePlate]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    public async findAll(): Promise<Car[]> {
        const result = await client.query('SELECT * FROM cars');
        return result.rows;
    }

    public async create(car: Car): Promise<Car> {
        const result = await client.query(
            'INSERT INTO cars (license_plate, color, brand) VALUES ($1, $2, $3) RETURNING *',
            [car.license_plate, car.color, car.brand]
        );
        return result.rows[0];
    }

    public async update(licensePlate: string, car: Car): Promise<Car | null> {
        const result = await client.query(
            'UPDATE cars SET color = $1, brand = $2 WHERE license_plate = $3 RETURNING *',
            [car.color, car.brand, licensePlate]
        );
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    public async delete(licensePlate: string): Promise<Car | null> {
        const result = await client.query('DELETE FROM cars WHERE license_plate = $1 RETURNING *', [licensePlate]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }
}

export default new CarRepository();
