import { Router } from 'express';

import { AuthenticationController } from '@/modules/authentication';

export const signinRoutes = Router();

signinRoutes.post('/', new AuthenticationController().handle);
