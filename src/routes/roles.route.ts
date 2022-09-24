import { Router } from 'express';

import { CreateRoleController, RemoveRoleController, UpdateRoleController } from '@/modules/roles';

export const rolesRoutes = Router();

rolesRoutes.post('/', new CreateRoleController().handle);
rolesRoutes.put('/update/:roleId', new UpdateRoleController().handle);
rolesRoutes.delete('/remove/:roleId', new RemoveRoleController().handle);
