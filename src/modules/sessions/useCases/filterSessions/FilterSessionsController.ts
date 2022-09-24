import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { FilterSessionsUseCase } from '@/modules/sessions';
import { logger, timeBr } from '@/shared';

export class FilterSessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId, roleId } = response.locals;
    const { field } = request.query;

    try {
      const filterSessionsUseCase = container.resolve(FilterSessionsUseCase);

      const sessions = await filterSessionsUseCase.execute({
        userId,
        field: field?.toString(),
        query: request.query,
        roleId,
      });

      logger.info(`${timeBr} | [TOTAL FILTER SESSIONS] => ${sessions.response.legth}`);

      return response.json(sessions);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [FILTER SESSIONS FAILED] => {field: ${field}}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
