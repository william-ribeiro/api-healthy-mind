import { Router } from 'express';
import {
  CreatePatientController,
  RemovePatientController,
  UpdatePatientController,
} from '../../modules/patients';

export const patientsRouter = Router();

patientsRouter.post('/', new CreatePatientController().handle);
patientsRouter.put('/update/:patientId', new UpdatePatientController().handle);
patientsRouter.delete('/remove/:patientId', new RemovePatientController().handle);
