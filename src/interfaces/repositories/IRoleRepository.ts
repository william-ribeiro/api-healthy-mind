import { ICreateRole, IRole, IUpdateRole } from '@/interfaces';

export interface IRoleRepository {
  getRoleById(roleId: number): Promise<IRole>;

  getRoleByName(name: string): Promise<IRole>;

  create(payload: ICreateRole): Promise<IRole>;

  update(roleId: number, payload: IUpdateRole): Promise<IRole>;

  remove(roleId: number, name: string): Promise<void>;
}
