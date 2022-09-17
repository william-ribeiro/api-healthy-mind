import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { CreateResourceUseCase } from './CreateResourceUseCase';

export class CreateResoureController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    const payload = request.body;

    try {
      const createResourceUseCase = container.resolve(CreateResourceUseCase);

      payload.userId = userId;

      const resource = await createResourceUseCase.execute({ payload });

      logger.info(`${timeBr} | [RESOURCE CREATED] => ${JSON.stringify({ payload })}`);

      return response.status(201).json(resource);
    } catch (err: Error | any) {
      logger.error(
        `${timeBr} | [RESOURCE NOT CREATED] => ${JSON.stringify({ ...payload, userId })}`,
      );

      throw new AppError(err.message, err.statusCode);
    }
  }
}
