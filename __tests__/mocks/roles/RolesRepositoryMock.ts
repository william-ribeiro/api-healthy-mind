/* eslint-disable @typescript-eslint/require-await */

import { ICreateRole, IRole, IRoleRepository, IUpdateRole } from '../../../src/interfaces';

import { fakeRoles } from './fakeRoles';

export class RolesRepositoryMock implements IRoleRepository {
  async getRoleById(id: number): Promise<IRole> {
    return fakeRoles.find((role) => role.id === id && role.enabled);
  }

  async getRoleByName(name: string): Promise<IRole> {
    return fakeRoles.find((role) => role.name === name && role.enabled);
  }

  async create(payload: ICreateRole): Promise<IRole> {
    const id = fakeRoles.length + 1;

    const index = fakeRoles.push({
      id,
      ...payload,
      enabled: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return fakeRoles[index - 1];
  }

  async update(roleId: number, payload: IUpdateRole): Promise<IRole> {
    const index = fakeRoles.findIndex((role) => role.id === roleId);

    const b = (fakeRoles[index] = {
      ...fakeRoles[index],
      ...payload,
    });
    return b;
  }

  async remove(roleId: number, name: string): Promise<void> {
    await this.update(roleId, { name, enabled: false });
  }
}
