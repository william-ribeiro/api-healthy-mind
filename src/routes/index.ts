import { Router } from 'express';

import { ensureAuthenticated, getIp } from '../middlewares';
import { addressRoutes } from './address';
import { authenticateRoutes } from './authenticate';
import { refreshTokenRoutes } from './refreshToken';
import { userRoutes } from './users';

const routes = Router();
routes.use(getIp);

routes.use('/signup', userRoutes);
routes.use('/signin', authenticateRoutes);
routes.use('/refresh-token', refreshTokenRoutes);

routes.use(ensureAuthenticated);
routes.use('/users', userRoutes);
routes.use('/address', addressRoutes);

export default routes;
