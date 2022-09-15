import { inject, injectable } from 'tsyringe';
import { CONTAINER, ROLE_PROTECTED } from '../../../../constants';
import { AppError } from '../../../../errors';
import { IRole, IRoleRepository, IUpdateRole } from '../../../../interfaces';
import { filterDefinedProperties, parseName } from '../../../../utils';
import { Validators } from './../../../../shared/validators/index';

@injectable()
export class UpdateRoleUseCase {
  constructor(
    @inject(CONTAINER.ROLE_REPOSITORY)
    private repository: IRoleRepository,
  ) {}

  async execute(roleId: number, payload: IUpdateRole): Promise<IRole> {
    if (typeof 'object' && !Object.values(payload).length) throw new AppError('Invalid payload');

    const role = await this.repository.getRoleById(roleId);

    if (!role) throw new AppError('Role not found', 404);

    if (ROLE_PROTECTED[role.name]) throw new AppError('Role is protected', 403);

    try {
      await new Validators().role.validate(payload, { abortEarly: true });
    } catch (err: Error | any) {
      throw new AppError(err.errors[0]);
    }

    const payload_ = { ...payload, name: parseName(payload.name) };

    return this.repository.update(roleId, { ...filterDefinedProperties(payload_) });
  }
}
