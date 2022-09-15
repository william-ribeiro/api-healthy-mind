import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { CreateRoleUseCase } from './CreateRoleUseCase';

export class CreateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const createRoleUseCase = container.resolve(CreateRoleUseCase);

      const role = await createRoleUseCase.execute(request.body);

      logger.info(`${timeBr} | [ROLE CREATED] => ${{ role }}`);

      return response.status(201).json(role);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [ROLE NOT CREATED] => ${err.message}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
