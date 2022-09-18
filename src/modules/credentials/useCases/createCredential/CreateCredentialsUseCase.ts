import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import { ICreateCredentials, ICredentials, ICredentialsRepository } from '../../../../interfaces';
import { toCamelCase } from '../../../../utils';

@injectable()
export class CreateCredentialsUseCase {
  constructor(
    @inject(CONTAINER.CREDENTIALS_REPOSITORY)
    private credentialsRepository: ICredentialsRepository,
  ) {}

  async execute(payload: ICreateCredentials): Promise<ICredentials> {
    return toCamelCase(await this.credentialsRepository.create(payload));
  }
}
