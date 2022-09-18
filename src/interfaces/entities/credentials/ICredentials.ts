export abstract class ICredentials {
  public readonly id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public ownerId: string;
  public accessToken: string;
  public refreshToken: string;
  public expiresIn: Date;
  public isValid: boolean;
}
