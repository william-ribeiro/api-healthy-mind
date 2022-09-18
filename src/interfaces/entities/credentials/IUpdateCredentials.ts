import { Moment } from 'moment';

export interface IUpdateCredentials {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: Moment;
  isValid?: boolean;
}
