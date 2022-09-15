export abstract class IRole {
  public readonly id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public name: string;
  public enabled: boolean;
}
