export abstract class IUser {
  public readonly id: string;
  public createdAt: Date;
  public updatedAt: Date;
  public name: string;
  public email: string;
  public password: string;
  public enabled: boolean;
  public roleId: number;
  public professionalRecord: string;
}
