import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { RemoveRoleUseCase } from '@/modules/roles';
import { logger, timeBr } from '@/shared';

export class RemoveRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { roleId } = request.params;
    try {
      const removeRoleUseCase = container.resolve(RemoveRoleUseCase);

      await removeRoleUseCase.execute(+roleId);

      logger.info(`${timeBr} | [ROLE REMOVED] => ${{ id: roleId }}`);

      return response.sendStatus(204);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [ROLE NOT REMOVED] => ${{ id: roleId }}`);

      throw new AppError(err.message, err.statuCode);
    }
  }
}
