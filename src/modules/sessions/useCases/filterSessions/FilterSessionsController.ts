import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { FilterSessionsUseCase } from './FilterSessionsUseCase';

export class FilterSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    const { field } = request.query;
    console.log(request.query);
    try {
      const filterSessionsUseCase = container.resolve(FilterSessionsUseCase);

      const sessions = await filterSessionsUseCase.execute({ userId, field, query: request.query });

      logger.info(`${timeBr} | [TOTAL FILTER SESSIONS] => ${sessions.response.legth}`);

      return response.json(sessions);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [FILTER SESSIONS FAILED] => {field: ${field}}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
