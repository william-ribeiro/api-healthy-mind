import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { UpdateRoleUseCase } from './UpdateRoleUseCase';

export class UpdateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const payload = request.body;
    const { roleId } = request.params;

    try {
      const updateRoleUseCase = container.resolve(UpdateRoleUseCase);

      const role = await updateRoleUseCase.execute(+roleId, payload);

      logger.info(`${timeBr} | [ROLE UPDATED] => ${JSON.stringify(payload)}`);

      return response.json(role);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [ROLE NOT UPDATED] => ${JSON.stringify(payload)}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
