import { container, delay } from 'tsyringe';
import { CONTAINER } from '../../constants';
import {
  IUsersRepository,
  IUserCredentialsRepository,
  IAddressRepository,
  IPatientRepository,
  ISessionRepository,
} from '../../interfaces';
import {
  AddressRepository,
  PatientRepository,
  SessionRepository,
  UserCredentialsRepository,
  UsersRepository,
} from '../../modules';

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
