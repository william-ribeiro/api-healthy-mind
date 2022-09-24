import moment from 'moment';
import { getRepository, Repository } from 'typeorm';

import { ICreateRole, IRole, IRoleRepository, IUpdateRole } from '@/interfaces';
import { Role } from '@/modules';

export class RoleRepository implements IRoleRepository {
  public repository: Repository<IRole>;

  constructor() {
    this.repository = getRepository(Role);
  }

  async getRoleById(roleId: number): Promise<IRole> {
    return this.repository.findOne({ id: roleId, enabled: true });
  }

  async getRoleByName(name: string): Promise<IRole> {
    return this.repository.findOne({ name, enabled: true });
  }

  async create(payload: ICreateRole): Promise<IRole> {
    const newRole = this.repository.create(payload);
    return this.repository.save(newRole);
  }

  async update(roleId: number, payload: IUpdateRole): Promise<IRole> {
    const { raw: updateRole } = await this.repository
      .createQueryBuilder()
      .update({ ...payload, updatedAt: moment() })
      .where('id=:id', { id: roleId })
      .returning('*')
      .execute();

    return updateRole;
  }

  async remove(roleId: number, name: string): Promise<void> {
    await this.update(roleId, { name, enabled: false });
  }
}
