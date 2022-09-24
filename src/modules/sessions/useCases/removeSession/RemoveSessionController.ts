import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { RemoveSessionUseCase } from '@/modules/sessions';
import { logger, timeBr } from '@/shared';

export class RemoveSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    const { sessionId } = request.params;

    try {
      const removeSessionUseCase = container.resolve(RemoveSessionUseCase);

      await removeSessionUseCase.execute(+sessionId, userId);

      logger.info(`${timeBr} | [REMOVED SESSION] => ${sessionId}`);

      return response.sendStatus(204);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [SESSION NOT REMOVED] => ${sessionId}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
