import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { RemovePatientUseCase } from './RemovePatientUseCase';

export class RemovePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { patientId } = request.params;
    const { id: userId } = response.locals;

    try {
      const removePatientUsecase = container.resolve(RemovePatientUseCase);

      await removePatientUsecase.execute(patientId, userId);

      logger.info(`${timeBr} | [PATIENT REMOVED] => patientId: ${patientId}`);

      return response.sendStatus(204);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [PATIENT NOT REMOVED] => patientId: ${patientId}`);
      throw new AppError(err.message, err.statusCode);
    }
  }
}
