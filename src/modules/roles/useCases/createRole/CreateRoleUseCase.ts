import { inject, injectable } from 'tsyringe';

import { CONTAINER } from '../../../../constants';
import { AppError } from '../../../../errors';
import { ICreateRole, IRoleRepository } from '../../../../interfaces';
import { Validators } from '../../../../shared';
import { Role } from '../../entities';
import { parseName } from '@/utils/helpers';

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject(CONTAINER.ROLE_REPOSITORY)
    private roleRepository: IRoleRepository,
  ) {}

  async execute(payload: ICreateRole): Promise<Role> {
    if (typeof 'object' && !Object.values(payload).length) throw new AppError('Invalid payload');

    try {
      await new Validators().role.validate(payload, { abortEarly: true });
    } catch (err: Error | any) {
      throw new AppError(err.errors[0]);
    }

    const { name } = payload;

    const role = await this.roleRepository.getRoleByName(parseName(name));

    if (role) throw new AppError('Role already exists', 409);

    return this.roleRepository.create({ name: parseName(name) });
  }
}
