import { CreateUserUseCase } from './CreateUserUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const createUserUseCase = container.resolve(CreateUserUseCase);

      const user = await createUserUseCase.execute(request.body);

      logger.info(`${timeBr} | [USER CREATED] => ${user.email}`);

      return response.status(201).json(user);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [USER NOT CREATED] => ${err.message}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
