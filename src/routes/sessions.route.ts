import { Router } from 'express';
import {
  ClinicalHistoryController,
  CreateSessionController,
  FilterSessionsController,
  ListSessionsController,
  RemoveSessionController,
  UpdateSessionController,
} from '../modules';

export const sessionsRoutes = Router();

sessionsRoutes.get('/list', new ListSessionsController().handle);
sessionsRoutes.get('/filter', new FilterSessionsController().handle);
sessionsRoutes.get('/:patientId', new ClinicalHistoryController().handle);

sessionsRoutes.post('/', new CreateSessionController().handle);
sessionsRoutes.put('/update/:sessionId', new UpdateSessionController().handle);
sessionsRoutes.delete('/remove/:sessionId', new RemoveSessionController().handle);
