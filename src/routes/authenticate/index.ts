import { Router } from 'express';
import { AuthenticationController } from '../../modules';

export const authenticateRoutes = Router();

authenticateRoutes.post('/', new AuthenticationController().handle);
