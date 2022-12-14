import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { UpdateRoleUseCase } from '@/modules/roles';
import { logger, timeBr } from '@/shared';

export class UpdateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const payload = request.body;
    const { roleId } = request.params;

    try {
      const updateRoleUseCase = container.resolve(UpdateRoleUseCase);

      const role = await updateRoleUseCase.execute(+roleId, payload);

      logger.info(`${timeBr} | [ROLE UPDATED] => ${JSON.stringify(payload)}`);

      return response.json(role);
    } catch (err) {
      logger.error(
        `${timeBr} | [ROLE NOT UPDATED] => Error: ${err.message} | ${JSON.stringify(payload)}`,
      );

      throw new AppError(err.message, err.statusCode);
    }
  }
}
