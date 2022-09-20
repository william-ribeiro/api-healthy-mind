import { Router } from 'express';
import { rolesRoutes } from './roles/index';

import { ensureAuthenticated, getIp } from '../middlewares';
import { addressRoutes } from './address';
import { authenticateRoutes } from './authenticate';
import { patientsRouter } from './patients';
import { refreshTokenRoutes } from './refreshToken';
import { resourceRoutes } from './resource';
import { sessionsRoutes } from './sessions';
import { userRoutes } from './users';

const routes = Router();
routes.use(getIp);

routes.use('/signup', userRoutes);
routes.use('/signin', authenticateRoutes);
routes.use('/refresh-token', refreshTokenRoutes);

routes.use(ensureAuthenticated);
routes.use('/users', userRoutes);
routes.use('/address', addressRoutes);
routes.use('/patients', patientsRouter);
routes.use('/sessions', sessionsRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/resources', resourceRoutes);

export default routes;
