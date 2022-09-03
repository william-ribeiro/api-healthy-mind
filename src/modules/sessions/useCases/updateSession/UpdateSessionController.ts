import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { UpdateSessionUseCase } from './UpdateSessionUseCase';

export class UpdateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    const { sessionId } = request.params;
    const payload = request.body;

    try {
      const updateSessionUseCase = container.resolve(UpdateSessionUseCase);

      const createSession = await updateSessionUseCase.execute(+sessionId, userId, payload);

      logger.info(`${timeBr} | [UPDATED SESSION] => ${JSON.stringify(createSession)}`);

      return response.status(201).json(createSession);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [SESSION NOT UPDATED] => ${JSON.stringify(payload)}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
