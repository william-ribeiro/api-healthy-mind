import { inject, injectable } from 'tsyringe';
import { CONTAINER } from '../../../../constants';
import { ICredentials, ICredentialsRepository, IUpdateCredentials } from '../../../../interfaces';
import { filterDefinedProperties } from '../../../../utils';

@injectable()
export class UpdateCredentialsUseCase {
  constructor(
    @inject(CONTAINER.CREDENTIALS_REPOSITORY)
    private credentialsRepository: ICredentialsRepository,
  ) {}

  async execute(ownerId: string, payload: IUpdateCredentials): Promise<ICredentials> {
    return this.credentialsRepository.update(ownerId, filterDefinedProperties(payload));
  }
}
