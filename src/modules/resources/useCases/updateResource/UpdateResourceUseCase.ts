import { inject, injectable } from 'tsyringe';

import { CONTAINER } from '@/constants';
import { AppError } from '@/errors';
import { IResource, IResourceRepository, IUpdateResource } from '@/interfaces';
import { payloadValidate, removeSpecialCharactersFromString } from '@/utils';

@injectable()
export class UpdateResourceUseCase {
  constructor(
    @inject(CONTAINER.RESOURCE_REPOSITORY)
    private resourceRepository: IResourceRepository,
  ) {}

  async execute({ resourceId, userId, payload }: IUpdateResource): Promise<IResource> {
    payloadValidate(payload);

    const resource = await this.resourceRepository.getResourceById({ resourceId, userId });

    if (!resource) throw new AppError('Resource not found', 404);

    const { title } = payload;

    if (
      title &&
      removeSpecialCharactersFromString(title) !== removeSpecialCharactersFromString(resource.title)
    ) {
      const resourceAlreadyExists = await this.resourceRepository.getResourceByTitle({
        title: removeSpecialCharactersFromString(title),
        userId,
      });

      if (resourceAlreadyExists) throw new AppError('Resource already exists');
    }

    return this.resourceRepository.update({ resourceId, userId, payload });
  }
}
