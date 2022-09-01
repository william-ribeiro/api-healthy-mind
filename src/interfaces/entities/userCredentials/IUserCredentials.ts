export abstract class IUserCredentials {
  public readonly id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public userId: string;
  public accessToken: string;
  public refreshToken: string;
  public expiresIn: Date;
  public isValid: boolean;
}
