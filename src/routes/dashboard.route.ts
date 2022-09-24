import { Router } from 'express';
import { DashboardController } from '../modules';

export const dashboardRoutes = Router();

dashboardRoutes.get('/', new DashboardController().handle);
