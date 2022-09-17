import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { RemoveResourceUseCase } from './RemoveResourceUseCase';

export class RemoveResourceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { resourceId } = request.params;
    const { id: userId } = response.locals;

    try {
      const removeResourceUseCase = container.resolve(RemoveResourceUseCase);

      await removeResourceUseCase.execute({ resourceId: +resourceId, userId });

      logger.info(`${timeBr} | [RESOURCE REMOVED] => resourceId: ${resourceId}`);

      return response.sendStatus(204);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [RESOURCE NOT REMOVED] => resourceId: ${resourceId}`);
      throw new AppError(err.message, err.statusCode);
    }
  }
}
