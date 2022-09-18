import { Moment } from 'moment';

export interface ICreateCredentials {
  ownerId: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: Moment;
}
