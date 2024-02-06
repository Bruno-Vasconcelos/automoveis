import { Request, Response } from 'express';
import CarUsageRepository from '../shared/infra/http/repositories/carUsageRepository';
import CarUsageService from '../shared/infra/http/services/carUsageService';
import PGClient from '../pg-cliente';

describe('Usage Service', () => {
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

  it('should register a new Usage', async () => {

    mockRequest.body = {
        "startDate": "2024-02-05T09:00:00",  
        "driverId": 13,                       
        "carId": 16,         
        "reason": "Viagem de ferias"  
      };

    jest.spyOn(CarUsageRepository, 'findActiveDriverUsage').mockResolvedValue(
        null,
    );
    jest.spyOn(CarUsageRepository, 'findActiveCarUsage').mockResolvedValue(
        null,
    );
    jest.spyOn(CarUsageRepository, 'createUsage').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await CarUsageService.registerUsage("2024-02-05T09:00:00", 13, 16, "Viagem de ferias")
    
    expect(result).toEqual({
        "startDate": "2024-02-05T09:00:00",  
        "driverId": 13,                       
        "carId": 16,         
        "reason": "Viagem de ferias"  
    });
  });

  it('should finish a Usage', async () => {

    mockRequest.body = {
        "id": 23,
        "start_date": "2024-02-05T12:00:00.000Z",
        "end_date": "2024-02-03T20:00:00.000Z",
        "driver_id": 11,
        "automobile_id": 13,
        "reason": "Viagem a negocios"
      };

    jest.spyOn(CarUsageRepository, 'finishUsage').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await CarUsageService.finishUsage(1, "2024-02-05T09:00:00")
    
    expect(result).toEqual({
        "id": 23,
        "start_date": "2024-02-05T12:00:00.000Z",
        "end_date": "2024-02-03T20:00:00.000Z",
        "driver_id": 11,
        "automobile_id": 13,
        "reason": "Viagem a negocios" 
    });
  });

  it('should finish a Usage', async () => {

    mockRequest.body = [{
        "id": 23,
        "start_date": "2024-02-05T12:00:00.000Z",
        "end_date": "2024-02-03T20:00:00.000Z",
        "driver_id": 11,
        "automobile_id": 13,
        "reason": "Viagem a negocios"
      },
      {
        "id": 23,
        "start_date": "2024-02-05T12:00:00.000Z",
        "end_date": "2024-02-03T20:00:00.000Z",
        "driver_id": 11,
        "automobile_id": 13,
        "reason": "Viagem a negocios"
      }];

    jest.spyOn(CarUsageRepository, 'listUsages').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await CarUsageService.listUsages()
    
    expect(result).toEqual([{
        "id": 23,
        "start_date": "2024-02-05T12:00:00.000Z",
        "end_date": "2024-02-03T20:00:00.000Z",
        "driver_id": 11,
        "automobile_id": 13,
        "reason": "Viagem a negocios"
      },
      {
        "id": 23,
        "start_date": "2024-02-05T12:00:00.000Z",
        "end_date": "2024-02-03T20:00:00.000Z",
        "driver_id": 11,
        "automobile_id": 13,
        "reason": "Viagem a negocios"
      }]);
  });
});
