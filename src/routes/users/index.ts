import { Router } from 'express';
import { CreateUserController } from '../../modules/users';

export const userRoutes = Router();

userRoutes.post('/', new CreateUserController().handle);
