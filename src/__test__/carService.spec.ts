import { Request, Response } from 'express';
import CarRepository from '../shared/infra/http/repositories/carRepository';
import CarService from '../shared/infra/http/services/carService';
import PGClient from '../pg-cliente';

describe('Car Service', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks()
  });

  afterAll(() => {
    PGClient.endInstance();
  });

  it('should register a new car', async () => {

    mockRequest.body = {
        brand: 'Toyota',
        color: 'Red',
        licensePlate: 'ABC123',
      };

    jest.spyOn(CarRepository, 'findByLicensePlate').mockResolvedValue(
        null,
    );
    jest.spyOn(CarRepository, 'create').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await CarService.registerCar("ABC123", 'Red', 'Toyota' )
    
    expect(result).toEqual({
      brand: 'Toyota',
      color: 'Red',
      licensePlate: 'ABC123',
    });
  });

  it('should update a car', async () => {

    mockRequest.body = {
        brand: 'Toyota',
        color: 'Red',
        licensePlate: 'ABC123',
      };

    jest.spyOn(CarRepository, 'findByLicensePlate').mockResolvedValue(
        mockRequest.body,
    );
    jest.spyOn(CarRepository, 'update').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await CarService.updateCar("ABC123", 'Red', 'Toyota' )
    
    expect(result).toEqual({
      brand: 'Toyota',
      color: 'Red',
      licensePlate: 'ABC123',
    });
  });

  it('should delete a car', async () => {

    mockRequest.body = {
        brand: 'Toyota',
        color: 'Red',
        licensePlate: 'ABC123',
      };

    jest.spyOn(CarRepository, 'findByLicensePlate').mockResolvedValue(
        mockRequest.body,
    );
    jest.spyOn(CarRepository, 'delete').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await CarService.deleteCar("ABC123" )
    
    expect(result).toEqual({
      brand: 'Toyota',
      color: 'Red',
      licensePlate: 'ABC123',
    });
  });

  it('should get a car', async () => {

    mockRequest.body = {
        brand: 'Toyota',
        color: 'Red',
        licensePlate: 'ABC123',
      };

    jest.spyOn(CarRepository, 'findByLicensePlate').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await CarService.getCar("ABC123" )
    
    expect(result).toEqual({
      brand: 'Toyota',
      color: 'Red',
      licensePlate: 'ABC123',
    });
  });

  it('should get a car', async () => {

    mockRequest.body = [{
        brand: 'Toyota',
        color: 'Red',
        licensePlate: 'ABC123',
      },
      {
        brand: 'Toyota',
        color: 'blue',
        licensePlate: 'BCA123',
      }];

    jest.spyOn(CarRepository, 'findAll').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await CarService.listCars()
    
    expect(result).toEqual([{
        brand: 'Toyota',
        color: 'Red',
        licensePlate: 'ABC123',
      },
      {
        brand: 'Toyota',
        color: 'blue',
        licensePlate: 'BCA123',
      }]);
  });

});
