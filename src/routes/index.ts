import { Router } from 'express';

import { getIp } from '../middlewares';
import { userRoutes } from './users';

const routes = Router();
routes.use(getIp);

routes.use('/signup', userRoutes);

export default routes;
