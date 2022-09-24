import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { ListSessionsUseCase } from '@/modules/sessions';
import { logger, timeBr } from '@/shared';

export class ListSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId, roleId } = response.locals;

    try {
      const listSessionUseCase = container.resolve(ListSessionsUseCase);

      const sessions = await listSessionUseCase.execute({ userId, query: request.query, roleId });

      logger.info(`${timeBr} | [TOTAL SESSIONS] => ${sessions.response.length}`);

      return response.json(sessions);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [LIST SESSIONS FAILED] `);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
