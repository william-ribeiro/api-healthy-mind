import { Router } from 'express';

import { DashboardController } from '@/modules/users';

export const dashboardRoutes = Router();

dashboardRoutes.get('/', new DashboardController().handle);
