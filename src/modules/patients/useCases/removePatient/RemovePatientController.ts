import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { RemovePatientUseCase } from '@/modules/patients';
import { logger, timeBr } from '@/shared';

export class RemovePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { patientId } = request.params;
    const { id: userId } = response.locals;

    try {
      const removePatientUsecase = container.resolve(RemovePatientUseCase);

      await removePatientUsecase.execute(patientId, userId);

      logger.info(`${timeBr} | [PATIENT REMOVED] => patientId: ${patientId}`);

      return response.sendStatus(204);
    } catch (err) {
      logger.error(
        `${timeBr} | [PATIENT NOT REMOVED] => Error: ${err.message} | patientId: ${patientId}`,
      );
      throw new AppError(err.message, err.statusCode);
    }
  }
}
