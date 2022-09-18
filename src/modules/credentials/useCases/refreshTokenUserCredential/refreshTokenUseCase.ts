import { decode, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { CONTAINER, JWT } from '../../../../constants';
import { AppError } from '../../../../errors';
import { ICredentialsRepository, IPayload, IRefreshToken } from '../../../../interfaces';
import { logger, timeBr } from '../../../../shared';
import { generateToken } from '../../../../utils';

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject(CONTAINER.CREDENTIALS_REPOSITORY)
    private credentialsRepository: ICredentialsRepository,
  ) {}

  async execute(refreshToken: string): Promise<IRefreshToken> {
    try {
      if (!refreshToken) throw new AppError('Invalid refreshToken');
      const { sub: ownerId } = verify(refreshToken, process.env.SECRET_REFRESH_TOKEN) as IPayload;

      const credential = await this.credentialsRepository.getCredentialByOwnerId(ownerId);

      if (!credential) throw new AppError('Login again');

      const accessToken = generateToken({ id: ownerId, type: JWT.TYPE.ACCESS_TOKEN });

      const newAccessToken = await this.credentialsRepository.update(ownerId, {
        accessToken,
      });

      return newAccessToken[0].accessToken;
    } catch (err: Error | any) {
      if (err.message === JWT.EXPIRED) {
        const { sub: ownerId } = decode(refreshToken);

        await this.credentialsRepository.update(ownerId.toString(), { isValid: false });
      }

      logger.error(`${timeBr} | [INVALID REFRESH TOKEN] =>`);
      throw new AppError(err.message, 401);
    }
  }
}
