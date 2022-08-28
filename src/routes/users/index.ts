import { Router } from 'express';
import {
  CreateUserController,
  RemoveUserController,
  UpdateUserController,
} from '../../modules/users';

export const userRoutes = Router();

userRoutes.post('/', new CreateUserController().handle);

userRoutes.put('/update', new UpdateUserController().handle);
userRoutes.delete('/remove', new RemoveUserController().handle);
