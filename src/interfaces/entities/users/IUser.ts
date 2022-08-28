export abstract class IUser {
  public readonly id: string;
  public created_at: Date;
  public updated_at: Date;
  public name: string;
  public email: string;
  public password: string;
  public enabled: boolean;
}
