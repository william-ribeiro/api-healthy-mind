import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import {
  IUpdateUserCredentials,
  IUserCredentials,
  IUserCredentialsRepository,
} from '../../../../interfaces';
import { filterDefinedProperties } from '../../../../utils';

@injectable()
export class UpdateUserCredentialsUseCase {
  constructor(
    @inject(CONTAINER.USER_CREDENTIALS_REPOSITORY)
    private userCredentialsRepository: IUserCredentialsRepository,
  ) {}

  async execute(userId: string, payload: IUpdateUserCredentials): Promise<IUserCredentials> {
    return this.userCredentialsRepository.update(userId, filterDefinedProperties(payload));
  }
}
