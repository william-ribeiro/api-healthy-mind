import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { RemoveUserUseCase } from './RemoveUserUseCase';

export class RemoveUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = response.locals;
    try {
      const removeUserUseCase = container.resolve(RemoveUserUseCase);

      await removeUserUseCase.execute(id);
      logger.info(`${timeBr} | [USER REMOVED] => ${id}`);

      return response.status(204).send();
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [USER NOT REMOVED] => ${id}`);

      throw new AppError(err.message);
    }
  }
}
