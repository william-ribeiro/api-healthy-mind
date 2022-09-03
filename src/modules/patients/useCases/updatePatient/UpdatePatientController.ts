import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { UpdatePatientUseCase } from './UpdatePatientUseCase';

export class UpdatePatientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    const { patientId } = request.params;
    const payload = request.body;
    try {
      const updatePatientUseCase = container.resolve(UpdatePatientUseCase);

      const updatePatient = await updatePatientUseCase.execute(patientId, userId, payload);

      logger.info(`${timeBr} | [UPDATED PATIENT] => ${JSON.stringify(payload)}`);

      return response.json(updatePatient);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [PATIENT NOT UPDATED] => ${JSON.stringify(payload)}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
