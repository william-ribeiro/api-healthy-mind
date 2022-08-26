import { Router } from 'express';

import { getIp, limit } from '../middlewares';

const routes = Router();
routes.use(getIp);

export default routes;
