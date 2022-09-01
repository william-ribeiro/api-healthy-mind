import { Moment } from 'moment';

export interface IUpdateUserCredentials {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: Moment;
  isValid?: boolean;
}
