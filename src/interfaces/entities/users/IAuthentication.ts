export interface IAuthentication {
  id: string;
  name: string;
  email: string;
  roleId: number;
  accessToken: string;
  refreshToken: string;
  isFirstLogin?: boolean;
}
