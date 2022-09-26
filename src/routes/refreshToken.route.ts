import { Router } from 'express';

import { RefreshTokenController } from '@/modules/credentials';

export const refreshTokenRoutes = Router();

refreshTokenRoutes.post('/', new RefreshTokenController().handle);
