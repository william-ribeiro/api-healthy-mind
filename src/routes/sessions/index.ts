import { Router } from 'express';
import { CreateSessionController } from '../../modules';

export const sessionsRoutes = Router();

sessionsRoutes.post('/', new CreateSessionController().handle);
