import { IUpdateAddress } from '../address';

export interface IUpdatePatient {
  userId?: string;
  addressId?: number;
  name?: string;
  email?: string;
  document?: string;
  gender?: string;
  birthDate?: string;
  phone?: string;
  enabled?: boolean;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
  isFirstLogin?: boolean;
  address?: IUpdateAddress;
}
