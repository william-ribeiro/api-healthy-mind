import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { CreateUserUseCase } from '@/modules/users';
import { logger, timeBr } from '@/shared';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const createUserUseCase = container.resolve(CreateUserUseCase);

      const user = await createUserUseCase.execute(request.body);

      logger.info(`${timeBr} | [USER CREATED] => ${user.email}`);

      return response.status(201).json(user);
    } catch (err) {
      logger.error(
        `${timeBr} | [USER NOT CREATED] => Error: ${err.message} | ${JSON.stringify(request.body)}`,
      );

      throw new AppError(err.message, err.statusCode);
    }
  }
}
