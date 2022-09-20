export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId: number;
  professionalRecord: string;
}
