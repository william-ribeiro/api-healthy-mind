import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { ClinicalHistoryUseCase } from '@/modules/sessions';
import { logger, timeBr } from '@/shared';

export class ClinicalHistoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { patientId } = request.params;

    try {
      const clinicalHistoryUseCase = container.resolve(ClinicalHistoryUseCase);

      const clinicalHistory = await clinicalHistoryUseCase.execute({ patientId });

      logger.info(`${timeBr} | [TOTAL CLINICAL HISTORY] => ${clinicalHistory.length}`);

      return response.json(clinicalHistory);
    } catch (err) {
      logger.error(`${timeBr} | [GET CLINICAL HISTORY FAILED] => Error: ${err.message} | `);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
