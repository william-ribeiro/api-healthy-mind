import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { FilterPatientsUseCase } from '@/modules/patients';
import { logger, timeBr } from '@/shared';

export class FilterPatientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    const { field } = request.query;

    try {
      const filterPatientsUseCase = container.resolve(FilterPatientsUseCase);

      const patients = await filterPatientsUseCase.execute({
        userId,
        field: field?.toString(),
        query: request.query,
      });

      logger.info(`${timeBr} | [TOTAL FILTER PATIENTS] => ${patients.response.legth}`);

      return response.json(patients);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [FILTER PATIENTS FAILED] => {field: ${field}}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
