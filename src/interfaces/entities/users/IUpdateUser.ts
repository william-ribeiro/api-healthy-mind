export interface IUpdateUser {
  name?: string;
  email?: string;
  password?: string;
  newPassword?: string;
  confirmPassword?: string;
  enabled?: boolean;
}
