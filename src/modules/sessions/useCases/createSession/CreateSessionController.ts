import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { CreateSessionUseCase } from './CreateSessionUseCase';

export class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    const payload = request.body;

    try {
      const createSessionUseCase = container.resolve(CreateSessionUseCase);

      const createSession = await createSessionUseCase.execute(userId, payload);

      logger.info(`${timeBr} | [CREATED SESSION] => ${JSON.stringify(createSession)}`);

      return response.status(201).json(createSession);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [SESSION NOT CREATED] => ${JSON.stringify(payload)}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
