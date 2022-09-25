import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { UpdateUserUseCase } from '@/modules/users';
import { logger, timeBr } from '@/shared';

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = response.locals;
    const payload = request.body;

    try {
      const updateUserUseCase = container.resolve(UpdateUserUseCase);

      const userUpdate = await updateUserUseCase.execute(id, payload);

      logger.info(`${timeBr} | [Updated user] => ${userUpdate.email}`);

      return response.json(userUpdate);
    } catch (err) {
      logger.error(`${timeBr} | [User not updated] => Error: ${err.message} | ${err.message}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
