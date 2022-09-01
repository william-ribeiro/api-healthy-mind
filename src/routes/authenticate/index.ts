import { Router } from 'express';

import { AuthenticateUserController } from '../../modules/users';

export const authenticateRoutes = Router();

authenticateRoutes.post('/', new AuthenticateUserController().handle);
