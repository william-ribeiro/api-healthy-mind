import {
  ICreateResource,
  IGetAllResources,
  IGetResourceById,
  IGetResourceByTitle,
  IRemoveResource,
  IResource,
  IUpdateResource,
} from '../entities';

export interface IResourceRepository {
  getResourceById({ resourceId, userId }: IGetResourceById): Promise<IResource>;
  getResourceByTitle({ title, userId }: IGetResourceByTitle): Promise<IResource>;
  getAllResources({ userId, skip }: IGetAllResources): Promise<[IResource[], number]>;
  create({ payload }: ICreateResource): Promise<IResource>;
  update({ resourceId, userId, payload }: IUpdateResource): Promise<IResource>;
  remove({ resourceId, userId, title }: IRemoveResource): Promise<void>;
}
