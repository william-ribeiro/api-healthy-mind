import { compare } from 'bcryptjs';
import moment from 'moment';
import { container, inject, injectable } from 'tsyringe';
import { ROLE_IDS } from './../../constants/index';

import { CONTAINER, JWT, ROLE_PROTECTED } from '../../constants';
import { AppError } from '../../errors';
import {
  IAuthentication,
  ICredentialsRepository,
  IPatientRepository,
  IUsersRepository,
} from '../../interfaces';
import { generateToken } from '../../utils';
import { CreateCredentialsUseCase, UpdateCredentialsUseCase } from '../credentials';

@injectable()
export class AuthenticationUseCase {
  constructor(
    @inject(CONTAINER.USERS_REPOSITORY)
    private userRepository: IUsersRepository,
    @inject(CONTAINER.PATIENT_REPOSITORY)
    private patientRepository: IPatientRepository,
    @inject(CONTAINER.CREDENTIALS_REPOSITORY)
    private credentialsRepository: ICredentialsRepository,
  ) {}

  async execute({ email, password, query }): Promise<IAuthentication> {
    const createCredentialsUseCase = container.resolve(CreateCredentialsUseCase);
    const updateCredentialsUseCase = container.resolve(UpdateCredentialsUseCase);

    const { type = ROLE_PROTECTED.Professional } = query;

    const owner: any =
      type.toLowerCase() === ROLE_PROTECTED.Patient.toLowerCase()
        ? await this.patientRepository.getPatientByAttribute({ email: email.toLowerCase().trim() })
        : await this.userRepository.getByEmail(email.toLowerCase().trim());

    if (!owner) throw new AppError('User or password incorrect', 401);

    const passwordMatch = await compare(password, owner.password);

    if (!passwordMatch) throw new AppError('User or password incorrect', 401);

    const roleId =
      type.toLowerCase() === ROLE_PROTECTED.Patient.toLowerCase()
        ? ROLE_IDS.PATIENT
        : ROLE_IDS.PROFESSIONAL;

    const accessToken = generateToken({ id: owner.id, type: JWT.TYPE.ACCESS_TOKEN, roleId });

    if (owner?.isFirstLogin) throw new AppError('Password must be changed', 400, accessToken);

    const refreshToken = generateToken({
      id: owner.id,
      type: JWT.TYPE.REFRESH_TOKEN,
      roleId,
    });

    const ownerCredentials = await this.credentialsRepository.getCredentialByOwnerId(owner.id);

    if (!ownerCredentials) {
      const createCredentials = {
        ownerId: owner.id,
        accessToken,
        refreshToken,
        expiresIn: moment().add(JWT.EXPIRATION_RT_DAYS, 'days'),
      };

      await createCredentialsUseCase.execute(createCredentials);

      return { id: owner.id, name: owner.name, email, accessToken, refreshToken };
    }

    if (ownerCredentials.isValid) await updateCredentialsUseCase.execute(owner.id, { accessToken });

    if (!ownerCredentials.isValid)
      await updateCredentialsUseCase.execute(owner.id, {
        accessToken,
        refreshToken,
        expiresIn: moment().add(JWT.EXPIRATION_RT_DAYS, 'days'),
        isValid: true,
      });

    return {
      id: owner.id,
      name: owner.name,
      email,
      accessToken,
      refreshToken: ownerCredentials.isValid ? ownerCredentials.refreshToken : refreshToken,
    };
  }
}
