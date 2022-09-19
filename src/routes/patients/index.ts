import { Router } from 'express';
import {
  CreatePatientController,
  FilterPatientsController,
  ListPatientsController,
  RemovePatientController,
  UpdatePatientController,
} from '../../modules/patients';

export const patientsRouter = Router();

patientsRouter.get('/list', new ListPatientsController().handle);
patientsRouter.get('/filter', new FilterPatientsController().handle);
patientsRouter.post('/', new CreatePatientController().handle);
patientsRouter.put('/update/:patientId', new UpdatePatientController().handle);
patientsRouter.delete('/remove/:patientId', new RemovePatientController().handle);
