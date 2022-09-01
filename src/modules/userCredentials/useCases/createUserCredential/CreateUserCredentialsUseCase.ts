import { inject, injectable } from 'tsyringe';
import {
  ICreateUserCredentials,
  IUserCredentials,
  IUserCredentialsRepository,
} from '../../../../interfaces';
import { CONTAINER } from '../../../../constants';
import { toCamelCase } from '../../../../utils';

@injectable()
export class CreateUserCredentialsUseCase {
  constructor(
    @inject(CONTAINER.USER_CREDENTIALS_REPOSITORY)
    private userCredentialsRepository: IUserCredentialsRepository,
  ) {}

  async execute(payload: ICreateUserCredentials): Promise<IUserCredentials> {
    return toCamelCase(await this.userCredentialsRepository.create(payload));
  }
}
