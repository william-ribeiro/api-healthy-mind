import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AppError } from '../../../../errors';
import { logger, timeBr } from '../../../../shared';
import { ClinicalHistoryUseCase } from './ClinicalHistoryUseCase';

export class ClinicalHistoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { patientId } = request.params;

    try {
      const clinicalHistoryUseCase = container.resolve(ClinicalHistoryUseCase);

      const clinicalHistory = await clinicalHistoryUseCase.execute({ patientId });

      logger.info(`${timeBr} | [TOTAL CLINICAL HISTORY] => ${clinicalHistory.length}`);

      return response.json(clinicalHistory);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [GET CLINICAL HISTORY FAILED] `);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
