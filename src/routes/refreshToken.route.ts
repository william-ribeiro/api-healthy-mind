import { Router } from 'express';

import { AUTH } from '@/middlewares';
import { RefreshTokenController } from '@/modules/credentials';

export const refreshTokenRoutes = Router();

refreshTokenRoutes.post('/', AUTH.ALL, new RefreshTokenController().handle);
