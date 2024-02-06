import { Request, Response } from 'express';
import DriverService from '../shared/infra/http/services/driverService';
import request from 'supertest';
import { app } from '../shared/infra/http/app';
import PGClient from '../pg-cliente';

describe('Driver Controller', () => {
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
      "name": "Luiza Polita"
    };

    jest.spyOn(DriverService, 'registerDriver').mockResolvedValue(
      mockRequest.body,
    );
    
    const response = await request(app)
            .post('/driver/register')
            .send(mockRequest.body) 

    expect(response.status).toStrictEqual(201);
    expect(response.body).toEqual({
        "name": "Luiza Polita"
    });
  });

  it('should get a driver', async () => {

    mockRequest.body = {
        "name": "Luiza Polita"
    };

    jest.spyOn(DriverService, 'getDriver').mockResolvedValue(
      mockRequest.body,
    );

    const response = await request(app)
            .get('/driver/get/1')
            .send()
    
    expect(response.status).toStrictEqual(200);
    expect(response.body).toEqual({
        "name": "Luiza Polita"
    });
  });

  it('should list all drivers', async () => {

    mockRequest.body = [{
        "name": "Luiza Polita"
    },
    {
        "name": "Bruno Vasconcelos"
    }];

    jest.spyOn(DriverService, 'listDrivers').mockResolvedValue(
      mockRequest.body,
    );

    const response = await request(app)
            .get('/driver/list')
            .send()
        
    expect(response.status).toStrictEqual(200);
    expect(response.body).toEqual([{
        "name": "Luiza Polita"
    },
    {
        "name": "Bruno Vasconcelos"
    }]);
  });

  it('should update a driver', async () => {

    mockRequest.body = {
        "name": "Luiza Borges Polita"
    };

    jest.spyOn(DriverService, 'updateDriver').mockResolvedValue(
      mockRequest.body,
    );

    const response = await request(app)
            .put('/driver/update/1')
            .send(mockRequest.body)
        
    expect(response.status).toStrictEqual(200);
    expect(response.body).toEqual({
        "name": "Luiza Borges Polita"
    });
  });

  it('should delete a driver', async () => {

    mockRequest.body = {
        "name": "Luiza Borges Polita"
    };

    jest.spyOn(DriverService, 'deleteDriver').mockResolvedValue(
      mockRequest.body,
    );

    const response = await request(app)
            .delete('/driver/delete/1')
            .send()
        
    expect(response.status).toStrictEqual(200);
    expect(response.body).toEqual({
        "name": "Luiza Borges Polita"
    });
  });

});
