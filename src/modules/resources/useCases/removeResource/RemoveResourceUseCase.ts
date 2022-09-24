import moment from 'moment';
import { inject, injectable } from 'tsyringe';

import { CONTAINER } from '@/constants';
import { AppError } from '@/errors';
import { IRemoveResource, IResourceRepository } from '@/interfaces';

@injectable()
export class RemoveResourceUseCase {
  constructor(
    @inject(CONTAINER.RESOURCE_REPOSITORY)
    private resourceRepository: IResourceRepository,
  ) {}

  async execute({ resourceId, userId }: IRemoveResource): Promise<void> {
    const resource = await this.resourceRepository.getResourceById({ resourceId, userId });

    if (!resource) throw new AppError('Resource not found', 404);

    const timestamp = moment().unix();

    const title_ = `${timestamp}_${resource.title}`;

    await this.resourceRepository.remove({ resourceId, userId, title: title_ });
  }
}
