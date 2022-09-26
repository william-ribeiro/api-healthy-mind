import { Router } from 'express';

import { AUTH } from '@/middlewares';
import { CreateRoleController, RemoveRoleController, UpdateRoleController } from '@/modules/roles';

export const rolesRoutes = Router();

rolesRoutes.post('/', AUTH.ADMIN, new CreateRoleController().handle);
rolesRoutes.put('/update/:roleId', AUTH.ADMIN, new UpdateRoleController().handle);
rolesRoutes.delete('/remove/:roleId', AUTH.ADMIN, new RemoveRoleController().handle);
