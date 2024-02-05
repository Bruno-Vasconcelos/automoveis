// __tests__/carController.test.ts
import { Request, Response } from 'express';
import { register } from '../shared/infra/http/controllers/carController';

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

  test('should register a new car', async () => {
    mockRequest.body = {
      licensePlate: 'ABC123',
      color: 'Red',
      brand: 'Toyota',
    };

    await register(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
      license_plate: 'ABC123',
      color: 'Red',
      brand: 'Toyota',
    }));
  });
});
