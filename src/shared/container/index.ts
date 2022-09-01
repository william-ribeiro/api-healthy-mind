import { container, delay } from 'tsyringe';
import { CONTAINER } from '../../constants';
import { IUsersRepository, IUserCredentialsRepository } from '../../interfaces';
import { UsersRepository, UserCredentialsRepository } from '../../modules';

container.registerSingleton<IUsersRepository>(
  CONTAINER.USERS_REPOSITORY,
  delay(() => UsersRepository),
);

container.registerSingleton<IUserCredentialsRepository>(
  CONTAINER.USER_CREDENTIALS_REPOSITORY,
  delay(() => UserCredentialsRepository),
);
