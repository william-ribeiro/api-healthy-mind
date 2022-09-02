export interface IUpdatePatients {
  userId?: string;
  addressId?: number;
  name?: string;
  email?: string;
  document?: string;
  gender?: string;
  birtDate?: Date;
  phone?: string;
  enabled?: boolean;
}
