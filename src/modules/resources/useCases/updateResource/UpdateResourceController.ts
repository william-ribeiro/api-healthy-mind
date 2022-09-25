import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { UpdateResourceUseCase } from '@/modules/resources';
import { logger, timeBr } from '@/shared';

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
    } catch (err) {
      logger.error(
        `${timeBr} | [RESOURCE NOT UPDATED] => Error: ${err.message} | ${JSON.stringify(payload)}`,
      );

      throw new AppError(err.message, err.statusCode);
    }
  }
}
