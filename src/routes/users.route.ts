import { Router } from 'express';

import { AUTH } from '@/middlewares';
import { CreateUserController, RemoveUserController, UpdateUserController } from '@/modules/users';

export const userRoutes = Router();

userRoutes.post('/', AUTH.PROFESSIONAL, new CreateUserController().handle);
userRoutes.put('/update', AUTH.PROFESSIONAL, new UpdateUserController().handle);
userRoutes.delete('/remove', AUTH.PROFESSIONAL, new RemoveUserController().handle);
