import { Request, Response } from 'express';
import CarService from '../shared/infra/http/services/carService';
import request from 'supertest';
import { app } from '../shared/infra/http/app';
import PGClient from '../pg-cliente';

describe('Car Controller', () => {
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
      licensePlate: 'ABC123',
      color: 'Red',
      brand: 'Toyota',
    };

    jest.spyOn(CarService, 'registerCar').mockResolvedValue(
      mockRequest.body,
    );
    const response = await request(app)
            .post('/car/register')
            .send(mockRequest.body)
        
    expect(response.status).toStrictEqual(201);
    expect(response.body).toEqual({
      licensePlate: 'ABC123',
      color: 'Red',
      brand: 'Toyota',
    });
  });

  it('should get a car', async () => {

    mockRequest.body = {
      licensePlate: 'ABC123',
      color: 'Red',
      brand: 'Toyota',
    };

    jest.spyOn(CarService, 'getCar').mockResolvedValue(
      mockRequest.body,
    );

    const response = await request(app)
            .get('/car/get/ABC123')
            .send()
        
    expect(response.status).toStrictEqual(200);
    expect(response.body).toEqual({
      licensePlate: 'ABC123',
      color: 'Red',
      brand: 'Toyota',
    });
  });

  it('should list all cars', async () => {

    mockRequest.body = [{
      licensePlate: 'ABC123',
      color: 'Red',
      brand: 'Toyota',
    },
    {
      licensePlate: '123ABC',
      color: 'Red',
      brand: 'Toyota',
    }];

    jest.spyOn(CarService, 'listCars').mockResolvedValue(
      mockRequest.body,
    );

    const response = await request(app)
            .get('/car/list')
            .send()
        
    expect(response.status).toStrictEqual(200);
    expect(response.body).toEqual([{
      licensePlate: 'ABC123',
      color: 'Red',
      brand: 'Toyota',
    },
    {
      licensePlate: '123ABC',
      color: 'Red',
      brand: 'Toyota',
    }]);
  });

  it('should update a car', async () => {

    mockRequest.body = {
      licensePlate: 'ABC123',
      color: 'silver',
      brand: 'Toyota',
    };

    jest.spyOn(CarService, 'updateCar').mockResolvedValue(
      mockRequest.body,
    );

    const response = await request(app)
            .put('/car/update/ABC123')
            .send(mockRequest.body)
        
    expect(response.status).toStrictEqual(200);
    expect(response.body).toEqual({
      licensePlate: 'ABC123',
      color: 'silver',
      brand: 'Toyota',
    });
  });

  it('should delete a car', async () => {

    mockRequest.body = {
      licensePlate: 'ABC123',
      color: 'silver',
      brand: 'Toyota',
    };

    jest.spyOn(CarService, 'deleteCar').mockResolvedValue(
      mockRequest.body,
    );

    const response = await request(app)
            .delete('/car/delete/ABC123')
            .send()
        
    expect(response.status).toStrictEqual(200);
    expect(response.body).toEqual({
      licensePlate: 'ABC123',
      color: 'silver',
      brand: 'Toyota',
    });
  });

});
