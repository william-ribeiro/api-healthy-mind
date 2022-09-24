import { Router } from 'express';
import { rolesRoutes } from './roles.route';

import { ensureAuthenticated, getIp } from '@/middlewares';
import { addressRoutes } from './address.route';
import { dashboardRoutes } from './dashboard.route';
import { patientsRouter } from './patients.route';
import { refreshTokenRoutes } from './refreshToken.route';
import { resourceRoutes } from './resource.route';
import { sessionsRoutes } from './sessions.route';
import { signinRoutes } from './signin.route';
import { userRoutes } from './users.route';

const routes = Router();
routes.use(getIp);

routes.use('/signup', userRoutes);
routes.use('/signin', signinRoutes);
routes.use('/refresh-token', refreshTokenRoutes);

routes.use(ensureAuthenticated);
routes.use('/dashboard', dashboardRoutes);
routes.use('/users', userRoutes);
routes.use('/address', addressRoutes);
routes.use('/patients', patientsRouter);
routes.use('/sessions', sessionsRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/resources', resourceRoutes);

export { routes };
