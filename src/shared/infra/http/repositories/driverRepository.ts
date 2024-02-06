// repositories/driverRepository.ts

import { Driver } from '../models/driverModel';
import PGClient from '../../../../pg-cliente';

const client = PGClient.getInstance();

class DriverRepository {
    public async createDriver(name: string): Promise<Driver> {
        const result = await client.query('INSERT INTO drivers (name) VALUES ($1) RETURNING *', [name]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    public async updateDriver(id: string, name: string): Promise<Driver> {
        const result = await client.query('UPDATE drivers SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    public async deleteDriver(id: string): Promise<Driver> {
        const result = await client.query('DELETE FROM drivers WHERE id = $1 RETURNING *', [id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    public async getDriver(id: string): Promise<Driver> {
        const result = await client.query('SELECT * FROM drivers WHERE id = $1', [id]);
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    public async listDrivers(name?: string): Promise<Driver[]> {
        let query = 'SELECT * FROM drivers';

        if (name) {
            query += ` WHERE name = '${name}'`;
        }

        const result = await client.query(query);
        return result.rows;
    }
}

export default new DriverRepository();
