import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@/errors';
import { RefreshTokenUseCase } from '@/modules/credentials';
import { logger, timeBr } from '@/shared';

export class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { refreshToken } = request.body;

    try {
      const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

      const newAcessToken = await refreshTokenUseCase.execute(refreshToken);

      logger.info(`${timeBr} | [REFRESH TOKEN SUCCESS] =>`);

      return response.json({ accessToken: newAcessToken });
    } catch (err) {
      logger.error(`${timeBr} | [REFRESH TOKEN FAIL] => Error: ${err.message} | ${err.message}`);

      throw new AppError(err.message, err.statusCode);
    }
  }
}
