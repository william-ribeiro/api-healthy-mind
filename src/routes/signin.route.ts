import { Router } from 'express';
import { AuthenticationController } from '../modules';

export const signinRoutes = Router();

signinRoutes.post('/', new AuthenticationController().handle);
