/* eslint-disable @typescript-eslint/require-await */
import { PAGINATION } from '@/constants';
import {
  ICreateResource,
  IGetAllResources,
  IGetResourceById,
  IGetResourceByTitle,
  IRemoveResource,
  IResource,
  IResourceRepository,
  IUpdateResource,
} from '@/interfaces';
import { buildClusters } from '@/utils';

import { fakeResources } from './fakeResources';

export class ResourceRepositoryMock implements IResourceRepository {
  async getResourceById({ resourceId, userId }: IGetResourceById): Promise<IResource> {
    return fakeResources.find(
      (resource) => resource.id === resourceId && resource.userId === userId && resource.enabled,
    );
  }

  async getResourceByTitle({ title, userId }: IGetResourceByTitle): Promise<IResource> {
    return fakeResources.find(
      (resource) =>
        resource.title.toLowerCase() === title.toLowerCase() &&
        resource.userId === userId &&
        resource.enabled,
    );
  }

  async getAllResources({ userId, skip }: IGetAllResources): Promise<[IResource[], number]> {
    const resources = fakeResources.filter(
      (resource) => resource.userId === userId && resource.enabled,
    );

    const total = resources.length;
    const paginateResources = !resources.length
      ? []
      : buildClusters(resources.splice(skip), PAGINATION.PER_PAGE)[0];

    return [paginateResources, total];
  }

  async create({ payload }: ICreateResource): Promise<IResource> {
    const index = fakeResources.push({
      id: fakeResources.length + 1,
      ...payload,
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return fakeResources[index - 1];
  }

  async update({ resourceId, userId, payload }: IUpdateResource): Promise<IResource> {
    const index = fakeResources.findIndex(
      (resource) => resource.id === resourceId && resource.userId === userId,
    );

    return (fakeResources[index] = {
      ...fakeResources[index],
      ...payload,
    });
  }

  async remove({ resourceId, userId, title }: IRemoveResource): Promise<void> {
    await this.update({ resourceId, userId, payload: { enabled: false, title } });
  }
}
