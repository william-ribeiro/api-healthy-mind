import moment from 'moment';
import { getRepository, ILike, Repository } from 'typeorm';
import { PAGINATION } from '../../../constants';
import {
  ICreateResource,
  IGetAllResources,
  IGetResourceById,
  IGetResourceByTitle,
  IRemoveResource,
  IResource,
  IResourceRepository,
  IUpdateResource,
} from '../../../interfaces';
import { Resource } from '../entities';

export class ResourceRepository implements IResourceRepository {
  private resourceRepository: Repository<IResource>;

  constructor() {
    this.resourceRepository = getRepository(Resource);
  }

  async getResourceById({ resourceId, userId }: IGetResourceById): Promise<IResource> {
    return this.resourceRepository.findOne({ id: resourceId, userId, enabled: true });
  }

  async getResourceByTitle({ title, userId }: IGetResourceByTitle): Promise<IResource> {
    return this.resourceRepository.findOne({ title: ILike(title), userId, enabled: true });
  }

  getAllResources({ userId, skip }: IGetAllResources): Promise<[IResource[], number]> {
    return this.resourceRepository
      .createQueryBuilder()
      .where('"userId"=:userId', { userId })
      .andWhere('enabled=:enabled', { enabled: true })
      .skip(skip)
      .take(PAGINATION.PER_PAGE)
      .getManyAndCount();
  }

  async create({ payload }: ICreateResource): Promise<IResource> {
    const newResource = this.resourceRepository.create(payload);
    return this.resourceRepository.save(newResource);
  }

  async update({ resourceId, userId, payload }: IUpdateResource): Promise<IResource> {
    const { raw: updateResource } = await this.resourceRepository
      .createQueryBuilder()
      .update({ ...payload, updatedAt: moment() })
      .where('id=:id', { id: resourceId })
      .andWhere('"userId"=:userId', { userId })
      .returning('*')
      .execute();

    return updateResource;
  }

  async remove({ resourceId, userId, title }: IRemoveResource): Promise<void> {
    await this.update({ resourceId, userId, payload: { title, enabled: false } });
  }
}
