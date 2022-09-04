import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { ListPatientsUseCase } from './ListPatientsUseCase';

export class ListPatientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;

    try {
      const listPatientsUseCase = container.resolve(ListPatientsUseCase);

      const patients = await listPatientsUseCase.execute({ userId, query: request.query });

      logger.info(`${timeBr} | [TOTAL PATIENTS] => ${patients.response.length}`);

      return response.json(patients);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [LIST PATIENTS FAILED] `);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
