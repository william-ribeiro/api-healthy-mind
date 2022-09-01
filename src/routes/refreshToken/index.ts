import { Router } from 'express';
import { RefreshTokenController } from '../../modules';

export const refreshTokenRoutes = Router();

refreshTokenRoutes.use('/', new RefreshTokenController().handle);
