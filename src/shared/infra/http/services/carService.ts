
import CarRepository from '../repositories/carRepository';
import { Car } from '../models/carModel';

class CarService {
    public async registerCar(licensePlate: string, color: string, brand: string): Promise<Car> {
        const existingCar = await CarRepository.findByLicensePlate(licensePlate);
        if (existingCar) {
            throw new Error('Placa já cadastrada.');
        }

        const newCar: Car = {
            license_plate: licensePlate,
            color: color,
            brand: brand,
        };

        const result = await CarRepository.create(newCar);
        return result
    }

    public async updateCar(licensePlate: string, color: string, brand: string): Promise<Car | null> {
        const existingCar = await CarRepository.findByLicensePlate(licensePlate);

        if (!existingCar) {
            throw new Error('Carro não encontrado.');
        }

        const updatedCar: Car = {
            license_plate: licensePlate,
            color: color,
            brand: brand,
        };

        return CarRepository.update(licensePlate, updatedCar);
    }

    public async deleteCar(licensePlate: string): Promise<Car | null> {
        const existingCar = await CarRepository.findByLicensePlate(licensePlate);

        if (!existingCar) {
            throw new Error('Carro não encontrado.');
        }

        return CarRepository.delete(licensePlate);
    }

    public async getCar(licensePlate: string): Promise<Car | null> {
        const car = await CarRepository.findByLicensePlate(licensePlate);

        if (!car) {
            throw new Error('Carro não encontrado.');
        }

        return car;
    }

    public async listCars(): Promise<Car[]> {
        return CarRepository.findAll();
    }
}

export default new CarService();