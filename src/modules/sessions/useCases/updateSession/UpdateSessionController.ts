import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { UpdateSessionUseCase } from '@/modules/sessions';
import { logger, timeBr } from '@/shared';

export class UpdateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    const { sessionId } = request.params;
    const payload = request.body;

    try {
      const updateSessionUseCase = container.resolve(UpdateSessionUseCase);

      const createSession = await updateSessionUseCase.execute(+sessionId, userId, payload);

      logger.info(`${timeBr} | [UPDATED SESSION] => ${JSON.stringify(createSession)}`);

      return response.json(createSession);
    } catch (err) {
      logger.error(
        `${timeBr} | [SESSION NOT UPDATED] => Error: ${err.message} | ${JSON.stringify(payload)}`,
      );

      throw new AppError(err.message, err.statusCode);
    }
  }
}
