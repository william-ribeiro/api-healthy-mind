import { container, delay } from 'tsyringe';
import { CONTAINER } from '../../constants';
import {
  IAddressRepository,
  ICredentialsRepository,
  IPatientRepository,
  IResourceRepository,
  IRoleRepository,
  ISessionRepository,
  IUsersRepository,
} from '../../interfaces';
import { AddressRepository } from '../../modules/address';
import { CredentialsRepository } from '../../modules/credentials';
import { PatientRepository } from '../../modules/patients';
import { ResourceRepository } from '../../modules/resources';
import { RoleRepository } from '../../modules/roles';
import { SessionRepository } from '../../modules/sessions';
import { UsersRepository } from '../../modules/users';

container.registerSingleton<IUsersRepository>(
  CONTAINER.USERS_REPOSITORY,
  delay(() => UsersRepository),
);

container.registerSingleton<ICredentialsRepository>(
  CONTAINER.CREDENTIALS_REPOSITORY,
  delay(() => CredentialsRepository),
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

container.registerSingleton<IResourceRepository>(
  CONTAINER.RESOURCE_REPOSITORY,
  delay(() => ResourceRepository),
);
