import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { DashboardUseCase } from '@/modules/users';
import { logger, timeBr } from '@/shared';

export class DashboardController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = response.locals;
    console.log('con', userId);
    try {
      const dashboardUseCase = container.resolve(DashboardUseCase);

      const dashboard = await dashboardUseCase.execute({ userId });

      logger.info(`${timeBr} | [TOTALS IN DASHBOARD] => ${JSON.stringify(dashboard)}`);

      return response.json(dashboard);
    } catch (err: Error | any) {
      logger.error(`${timeBr} | [GET DASHBOARD FAILED] `);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
