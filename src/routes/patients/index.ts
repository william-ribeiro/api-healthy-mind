import { Router } from 'express';
import {
  CreatePatientController,
  FilterPatientsController,
  ListPatientsController,
  PatientInfoController,
  RemovePatientController,
  UpdatePatientController,
} from '../../modules/patients';

export const patientsRouter = Router();

patientsRouter.get('/list', new ListPatientsController().handle);
patientsRouter.get('/filter', new FilterPatientsController().handle);
patientsRouter.get('/info/:patientId', new PatientInfoController().handle);
patientsRouter.post('/', new CreatePatientController().handle);
patientsRouter.put('/update/:patientId', new UpdatePatientController().handle);
patientsRouter.delete('/remove/:patientId', new RemovePatientController().handle);
