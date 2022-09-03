import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { ListSessionsUseCase } from './ListSessionsUseCase';

export class ListSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;

    try {
      const listSessionUseCase = container.resolve(ListSessionsUseCase);

      const sessions = await listSessionUseCase.execute(userId);

      logger.info(`${timeBr} | [TOTAL SESSIONS] => ${sessions.length}`);

      return response.json(sessions);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [LIST SESSIONS FAILED] `);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
