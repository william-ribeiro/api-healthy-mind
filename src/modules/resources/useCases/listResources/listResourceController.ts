import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { ListResourceUseCase } from '@/modules/resources';
import { logger, timeBr } from '@/shared';

export class ListResourceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    try {
      const listResourceUseCase = container.resolve(ListResourceUseCase);

      const resources = await listResourceUseCase.execute({ userId, query: request.query });

      logger.info(`${timeBr} | [TOTAL RESOURCES] => ${resources.total}`);

      return response.json(resources);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [LIST RESOURCE FAILED]`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
