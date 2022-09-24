import { inject, injectable } from 'tsyringe';

import { CONTAINER } from '@/constants';
import { AppError } from '@/errors';
import { ICreateResource, IResource, IResourceRepository } from '@/interfaces';
import { Validators } from '@/shared';
import { removeSpecialCharactersFromString } from '@/utils';

@injectable()
export class CreateResourceUseCase {
  constructor(
    @inject(CONTAINER.RESOURCE_REPOSITORY)
    private resourceRepository: IResourceRepository,
  ) {}

  async execute({ payload }: ICreateResource): Promise<IResource> {
    if (typeof 'object' && Object.values(payload).length <= 1)
      throw new AppError('Invalid payload');

    try {
      await new Validators().resource.validate(payload, { abortEarly: true });
    } catch (err: Error | any) {
      throw new AppError(err.errors[0]);
    }

    const { title, userId } = payload;

    const titleAlreadyExists = await this.resourceRepository.getResourceByTitle({
      title: removeSpecialCharactersFromString(title),
      userId,
    });

    if (titleAlreadyExists) throw new AppError('Resource already exists', 409);

    return this.resourceRepository.create({ payload });
  }
}
