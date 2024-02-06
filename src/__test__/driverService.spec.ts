import { Request, Response } from 'express';
import DriverRepository from '../shared/infra/http/repositories/driverRepository';
import DriverService from '../shared/infra/http/services/driverService';
import PGClient from '../pg-cliente';

describe('Driver Service', () => {
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

  it('should register a new driver', async () => {

    mockRequest.body = {
        "id": 14,
        "name": "Bruno Vasconcelos"
      };

    jest.spyOn(DriverRepository, 'createDriver').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await DriverService.registerDriver("Bruno Vasconcelos" )
    
    expect(result).toEqual({
        "id": 14,
        "name": "Bruno Vasconcelos"
    });
  });

  it('should update a driver', async () => {

    mockRequest.body = {
        "id": 1,
        "name": "Bruno Vasconcelos"
      };

    jest.spyOn(DriverRepository, 'updateDriver').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await DriverService.updateDriver("1", "Bruno Vasconcelos" )
    
    expect(result).toEqual({
        "id": 1,
        "name": "Bruno Vasconcelos"
    });
  });

  it('should delete a driver', async () => {

    mockRequest.body = {
        "id": 1,
        "name": "Bruno Vasconcelos"
      };

    jest.spyOn(DriverRepository, 'deleteDriver').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await DriverService.deleteDriver("1")
    
    expect(result).toEqual({
        "id": 1,
        "name": "Bruno Vasconcelos"
    });
  });

  it('should get a driver', async () => {

    mockRequest.body = {
        "id": 1,
        "name": "Bruno Vasconcelos"
      };

    jest.spyOn(DriverRepository, 'getDriver').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await DriverService.getDriver("1")
    
    expect(result).toEqual({
        "id": 1,
        "name": "Bruno Vasconcelos"
    });
  });


  it('should list drivers', async () => {

    mockRequest.body = [{
        "id": 1,
        "name": "Bruno Vasconcelos"
      },
      {
        "id": 2,
        "name": "Luiza Polita"
      }];

    jest.spyOn(DriverRepository, 'listDrivers').mockResolvedValue(
        mockRequest.body,
    );
    
    const result = await DriverService.listDrivers()
    
    expect(result).toEqual([{
        "id": 1,
        "name": "Bruno Vasconcelos"
      },
      {
        "id": 2,
        "name": "Luiza Polita"
      }]);
  });
});
