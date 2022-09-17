import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { UpdateResourceUseCase } from './UpdateResourceUseCase';

export class UpdateResourceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const payload = request.body;
    const { resourceId } = request.params;
    const { id: userId } = response.locals;

    try {
      const updateResourceUseCase = container.resolve(UpdateResourceUseCase);

      const resource = await updateResourceUseCase.execute({
        resourceId: +resourceId,
        userId,
        payload,
      });

      logger.info(`${timeBr} | [RESOURCE CREATED] => ${JSON.stringify(payload)}`);

      return response.json(resource);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [RESOURCE NOT UPDATED] => ${JSON.stringify(payload)}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}