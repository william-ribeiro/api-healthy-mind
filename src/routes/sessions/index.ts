import { Router } from 'express';
import {
  CreateSessionController,
  ListSessionsController,
  RemoveSessionController,
  UpdateSessionController,
} from '../../modules';

export const sessionsRoutes = Router();

sessionsRoutes.get('/', new ListSessionsController().handle);
sessionsRoutes.post('/', new CreateSessionController().handle);
sessionsRoutes.put('/update/:sessionId', new UpdateSessionController().handle);
sessionsRoutes.delete('/remove/:sessionId', new RemoveSessionController().handle);
