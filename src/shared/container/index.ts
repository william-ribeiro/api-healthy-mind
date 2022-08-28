import { container, delay } from 'tsyringe';
import { CONTAINER } from '../../constants';
import { IUsersRepository } from '../../interfaces';
import { UsersRepository } from '../../modules/users';

container.registerSingleton<IUsersRepository>(
  CONTAINER.USERS_REPOSITORY,
  delay(() => UsersRepository),
);
