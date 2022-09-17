export abstract class IResource {
  public readonly id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public userId: string;
  public category: string;
  public title: string;
  public description: string;
  public enabled: boolean;
}
