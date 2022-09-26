import { Router } from 'express';

import { AUTH } from '@/middlewares';
import { DashboardController } from '@/modules/users';

export const dashboardRoutes = Router();

dashboardRoutes.get('/', AUTH.PROFESSIONAL, new DashboardController().handle);
