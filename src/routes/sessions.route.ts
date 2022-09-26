import { Router } from 'express';

import { AUTH } from '@/middlewares';
import {
  ClinicalHistoryController,
  CreateSessionController,
  FilterSessionsController,
  ListSessionsController,
  RemoveSessionController,
  UpdateSessionController,
} from '@/modules/sessions';

export const sessionsRoutes = Router();

sessionsRoutes.get('/:patientId', AUTH.ALL, new ClinicalHistoryController().handle);
sessionsRoutes.get('/list', AUTH.ALL, new ListSessionsController().handle);

sessionsRoutes.get('/filter', AUTH.PROFESSIONAL, new FilterSessionsController().handle);
sessionsRoutes.post('/', AUTH.PROFESSIONAL, new CreateSessionController().handle);
sessionsRoutes.put('/update/:sessionId', AUTH.PROFESSIONAL, new UpdateSessionController().handle);
sessionsRoutes.delete(
  '/remove/:sessionId',
  AUTH.PROFESSIONAL,
  new RemoveSessionController().handle,
);
