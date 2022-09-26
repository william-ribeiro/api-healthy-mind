import { Router } from 'express';

import { AUTH } from '@/middlewares';
import {
  CreateResoureController,
  ListResourceController,
  RemoveResourceController,
  UpdateResourceController,
} from '@/modules/resources';

export const resourceRoutes = Router();

resourceRoutes.get('/list', AUTH.PROFESSIONAL, new ListResourceController().handle);
resourceRoutes.post('/', AUTH.PROFESSIONAL, new CreateResoureController().handle);
resourceRoutes.put('/update/:resourceId', AUTH.PROFESSIONAL, new UpdateResourceController().handle);
resourceRoutes.delete(
  '/remove/:resourceId',
  AUTH.PROFESSIONAL,
  new RemoveResourceController().handle,
);
