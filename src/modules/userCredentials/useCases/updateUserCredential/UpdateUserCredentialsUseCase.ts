import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import {
  IUpdateUserCredentials,
  IUserCredentials,
  IUserCredentialsRepository,
} from '../../../../interfaces';
import { filterDefinedProperties, toCamelCase } from '../../../../utils';

@injectable()
export class UpdateUserCredentialsUseCase {
  constructor(
    @inject(CONTAINER.USER_CREDENTIALS_REPOSITORY)
    private userCredentialsRepository: IUserCredentialsRepository,
  ) {}

  async execute(userId: string, payload: IUpdateUserCredentials): Promise<IUserCredentials> {
    return toCamelCase(
      await this.userCredentialsRepository.update(userId, filterDefinedProperties(payload)),
    );
  }
}
