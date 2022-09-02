import { Router } from 'express';
import { CreatePatientController } from '../../modules/patients';

export const patientsRouter = Router();

patientsRouter.post('/', new CreatePatientController().handle);
