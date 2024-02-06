import express from 'express';
const router = express.Router();

// Importando controllers
import {
    register as registerCar,
    update as updateCar,
    get as getCar,
    deleteCar as deleteCar, 
    list as listCars,
} from '../controllers/carController';

import {
    finishUsage,
    registerUsage,
    listUsage,
} from '../controllers/carUsageController';

import {
    registerDriver,
    updateDriver,
    deleteDriver,
    getDriver,
    listDrivers,
} from '../controllers/driverController';

// Rotas para Ações com o carro
router.post('/car/register', registerCar);
router.put('/car/update/:licensePlate', updateCar);
router.get('/car/get/:licensePlate', getCar);
router.delete('/car/delete/:licensePlate', deleteCar);
router.get('/car/list', listCars);

// Rotas para uso do carro
router.post('/carUsage/register', registerUsage);
router.put('/carUsage/finish/:carUsageId', finishUsage);
router.get('/carUsage/list', listUsage);

// Rotas para ações do motorista
router.post('/driver/register', registerDriver);
router.put('/driver/update/:id', updateDriver);
router.delete('/driver/delete/:id', deleteDriver);
router.get('/driver/get/:id', getDriver);
router.get('/driver/list', listDrivers);

export default router;

export { router };
