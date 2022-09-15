import { container, delay } from 'tsyringe';
import { CONTAINER } from '../../constants';
import {
  IAddressRepository,
  IPatientRepository,
  IRoleRepository,
  ISessionRepository,
  IUserCredentialsRepository,
  IUsersRepository,
} from '../../interfaces';
import { AddressRepository } from '../../modules/address';
import { PatientRepository } from '../../modules/patients';
import { RoleRepository } from '../../modules/roles';
import { SessionRepository } from '../../modules/sessions';
import { UserCredentialsRepository } from '../../modules/userCredentials';
import { UsersRepository } from '../../modules/users';

container.registerSingleton<IUsersRepository>(
  CONTAINER.USERS_REPOSITORY,
  delay(() => UsersRepository),
);

container.registerSingleton<IUserCredentialsRepository>(
  CONTAINER.USER_CREDENTIALS_REPOSITORY,
  delay(() => UserCredentialsRepository),
);

container.registerSingleton<IAddressRepository>(
  CONTAINER.ADDRESS_REPOSITORY,
  delay(() => AddressRepository),
);

container.registerSingleton<IPatientRepository>(
  CONTAINER.PATIENT_REPOSITORY,
  delay(() => PatientRepository),
);

container.registerSingleton<ISessionRepository>(
  CONTAINER.SESSIONS_REPOSITORY,
  delay(() => SessionRepository),
);

container.registerSingleton<IRoleRepository>(
  CONTAINER.ROLE_REPOSITORY,
  delay(() => RoleRepository),
);
