import moment from 'moment';
import { inject, injectable } from 'tsyringe';

import { CONTAINER, ROLE_PROTECTED } from '@/constants';
import { AppError } from '@/errors';
import { IRoleRepository } from '@/interfaces';

@injectable()
export class RemoveRoleUseCase {
  constructor(
    @inject(CONTAINER.ROLE_REPOSITORY)
    private repository: IRoleRepository,
  ) {}

  async execute(roleId: number): Promise<void> {
    const role = await this.repository.getRoleById(roleId);

    if (!role) throw new AppError('Role not found', 404);

    if (ROLE_PROTECTED[role.name]) throw new AppError('Role is protected', 403);

    const timestamp = moment().unix();

    const name = `${timestamp}_${role.name}`;

    await this.repository.remove(roleId, name);
  }
}
