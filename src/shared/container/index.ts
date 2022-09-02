import { container, delay } from 'tsyringe';
import { CONTAINER } from '../../constants';
import {
  IUsersRepository,
  IUserCredentialsRepository,
  IAddressRepository,
  IPatientRepository,
} from '../../interfaces';
import { UsersRepository, UserCredentialsRepository } from '../../modules';
import { AddressRepository } from '../../modules/address';
import { PatientRepository } from '../../modules/patients';

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
