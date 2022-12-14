import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { CreateSessionUseCase } from '@/modules/sessions';
import { logger, timeBr } from '@/shared';

export class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    const payload = request.body;

    try {
      const createSessionUseCase = container.resolve(CreateSessionUseCase);

      const createSession = await createSessionUseCase.execute(userId, payload);

      logger.info(`${timeBr} | [CREATED SESSION] => ${JSON.stringify(createSession)}`);

      return response.status(201).json(createSession);
    } catch (err) {
      logger.error(
        `${timeBr} | [SESSION NOT CREATED] => Error: ${err.message} | ${JSON.stringify(payload)}`,
      );

      throw new AppError(err.message, err.statusCode);
    }
  }
}
