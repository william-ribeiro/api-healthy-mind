import { Router } from 'express';

import { getIp } from '../middlewares';
import { userRoutes } from './users';

const routes = Router();
routes.use(getIp);

routes.use('/signup', userRoutes);

routes.use('/users', userRoutes);

export default routes;
