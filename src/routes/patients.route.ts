import { Router } from 'express';

import { AUTH } from '@/middlewares';
import {
  CreatePatientController,
  FilterPatientsController,
  ListPatientsController,
  PatientInfoController,
  RemovePatientController,
  UpdatePatientController,
} from '@/modules/patients';

export const patientsRouter = Router();

patientsRouter.get('/info/:patientId', AUTH.ALL, new PatientInfoController().handle);
patientsRouter.put('/update/:patientId', AUTH.ALL, new UpdatePatientController().handle);

patientsRouter.get('/list', AUTH.PROFESSIONAL, new ListPatientsController().handle);
patientsRouter.get('/filter', AUTH.PROFESSIONAL, new FilterPatientsController().handle);
patientsRouter.post('/', AUTH.PROFESSIONAL, new CreatePatientController().handle);
patientsRouter.delete(
  '/remove/:patientId',
  AUTH.PROFESSIONAL,
  new RemovePatientController().handle,
);
