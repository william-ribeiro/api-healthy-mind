import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { PatientInfoUseCase } from './PatientInfoUseCase';

export class PatientInfoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    const { patientId } = request.params;

    try {
      const patientInfoUseCase = container.resolve(PatientInfoUseCase);

      const patients = await patientInfoUseCase.execute({ userId, patientId });

      logger.info(`${timeBr} | [PATIENT INFO SUCCESS] => ${patientId}`);

      return response.json(patients);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [PATIENT INFO FAILED] => ${patientId}}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
