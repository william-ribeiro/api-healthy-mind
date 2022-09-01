import { Moment } from 'moment';

export interface ICreateUserCredentials {
  userId: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: Moment;
}
