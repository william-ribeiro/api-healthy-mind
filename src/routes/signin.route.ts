import { Router } from 'express';

import { AUTH } from '@/middlewares';
import { AuthenticationController } from '@/modules/authentication';

export const signinRoutes = Router();

signinRoutes.post('/', AUTH.ALL, new AuthenticationController().handle);
