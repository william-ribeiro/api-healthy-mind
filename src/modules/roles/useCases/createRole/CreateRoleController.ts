import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { CreateRoleUseCase } from '@/modules/roles';
import { logger, timeBr } from '@/shared';

export class CreateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const createRoleUseCase = container.resolve(CreateRoleUseCase);

      const role = await createRoleUseCase.execute(request.body);

      logger.info(`${timeBr} | [ROLE CREATED] => ${{ role }}`);

      return response.status(201).json(role);
    } catch (err) {
      logger.error(`${timeBr} | [ROLE NOT CREATED] => Error: ${err.message} | ${err.message}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
