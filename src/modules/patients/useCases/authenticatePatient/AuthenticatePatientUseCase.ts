import { container, inject, injectable } from 'tsyringe';

import {
  IAuthenticateUser,
  ICredentialsRepository,
  IPatientRepository,
} from '../../../../interfaces';

import { compare } from 'bcryptjs';
import moment from 'moment';
import { CONTAINER, JWT } from '../../../../constants';
import { AppError } from '../../../../errors';
import { generateToken } from '../../../../utils';
import { CreateCredentialsUseCase, UpdateCredentialsUseCase } from '../../../credentials';

@injectable()
export class AuthenticatePatientUseCase {
  constructor(
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
    @inject(CONTAINER.CREDENTIALS_REPOSITORY)
    private credentialsRepository: ICredentialsRepository,
  ) {}

  async execute({ email, password }): Promise<IAuthenticateUser> {
    const createCredentialsUseCase = container.resolve(CreateCredentialsUseCase);
    const updateCredentialsUseCase = container.resolve(UpdateCredentialsUseCase);

    const patient = await this.patientRepository.getPatientByAttribute({
      email: email.toLowerCase().trim(),
    });

    if (!patient) throw new AppError('Patient or password incorrect');

    const passwordMatch = await compare(password, patient.password);

    if (!passwordMatch) throw new AppError('Patient or password incorrect');

    const accessToken = generateToken({ id: patient.id, type: JWT.TYPE.ACCESS_TOKEN });
    const refreshToken = generateToken({
      id: patient.id,
      type: JWT.TYPE.REFRESH_TOKEN,
    });

    const patientCredentials = await this.credentialsRepository.getCredentialByOwnerId(patient.id);

    if (!patientCredentials) {
      const createCredentials = {
        ownerId: patient.id,
        accessToken,
        refreshToken,
        expiresIn: moment().add(JWT.EXPIRATION_RT_DAYS, 'days'),
      };

      await createCredentialsUseCase.execute(createCredentials);

      return { id: patient.id, name: patient.name, email, accessToken, refreshToken };
    }

    if (patientCredentials.isValid)
      await updateCredentialsUseCase.execute(patient.id, { accessToken });

    if (!patientCredentials.isValid)
      await updateCredentialsUseCase.execute(patient.id, {
        accessToken,
        refreshToken,
        expiresIn: moment().add(JWT.EXPIRATION_RT_DAYS, 'days'),
        isValid: true,
      });

    return {
      id: patient.id,
      name: patient.name,
      email,
      accessToken,
      refreshToken: patientCredentials.isValid ? patientCredentials.refreshToken : refreshToken,
    };
  }
}
