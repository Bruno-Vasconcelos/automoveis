import { listUsage } from './../shared/infra/http/controllers/carUsageController';
import { Request, Response } from 'express';
import CarUsageService from '../shared/infra/http/services/carUsageService';
import request from 'supertest';
import { app } from '../shared/infra/http/app';
import PGClient from '../pg-cliente';
import carUsageService from '../shared/infra/http/services/carUsageService';

describe('CarUsage Controller', () => {
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

  it('should register a new carUsage', async () => {

    mockRequest.body = {
        "startDate": "2024-02-05T09:00:00",  
        "driverId": 1,                       
        "carId": 1,         
        "reason": "Viagem de negocios"       
      };

    jest.spyOn(CarUsageService, 'registerUsage').mockResolvedValue(
      mockRequest.body,
    );
    
    const response = await request(app)
            .post('/carusage/register')
            .send(mockRequest.body) 

    expect(response.status).toStrictEqual(201);
    expect(response.body).toEqual({
        "startDate": "2024-02-05T09:00:00",  
        "driverId": 1,                       
        "carId": 1,         
        "reason": "Viagem de negocios"       
      });
  });


  it('should list all usages', async () => {

    mockRequest.body = [{
      "startDate": "2024-02-05T09:00:00",  
      "driverId": 1,                       
      "carId": 1,         
      "reason": "Viagem de negocios"       
    },
    {
      "startDate": "2024-02-05T09:00:00",  
      "driverId": 2,                       
      "carId": 2,         
      "reason": "Viagem de negocios"       
    }];

    jest.spyOn(CarUsageService, 'listUsages').mockResolvedValue(
      mockRequest.body,
    );

    const response = await request(app)
            .get('/carusage/list')
            .send()

    expect(response.status).toStrictEqual(200);
    expect(response.body).toEqual([{
      "startDate": "2024-02-05T09:00:00",  
      "driverId": 1,                       
      "carId": 1,         
      "reason": "Viagem de negocios"       
    },
    {
      "startDate": "2024-02-05T09:00:00",  
      "driverId": 2,                       
      "carId": 2,         
      "reason": "Viagem de negocios"       
    }]);
  });

  it('should finish a usage', async () => {

    mockRequest.body = {
      "startDate": "2024-02-05T09:00:00",  
      "driverId": 1,                       
      "carId": 1,         
      "reason": "Viagem de negocios"       
    };

    jest.spyOn(carUsageService, 'finishUsage').mockResolvedValue(
      mockRequest.body,
    );

    const response = await request(app)
            .put('/carusage/finish/1')
            .send(mockRequest.body)
        
    expect(response.status).toStrictEqual(200);
    expect(response.body).toEqual({
      "startDate": "2024-02-05T09:00:00",  
      "driverId": 1,                       
      "carId": 1,         
      "reason": "Viagem de negocios"       
    });
  });

});
