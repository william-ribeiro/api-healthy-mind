import { Router } from 'express';
import {
  CreateResoureController,
  ListResourceController,
  RemoveResourceController,
  UpdateResourceController,
} from '../../modules';

export const resourceRoutes = Router();

resourceRoutes.get('/list', new ListResourceController().handle);
resourceRoutes.post('/', new CreateResoureController().handle);
resourceRoutes.put('/update/:resourceId', new UpdateResourceController().handle);
resourceRoutes.delete('/remove/:resourceId', new RemoveResourceController().handle);
