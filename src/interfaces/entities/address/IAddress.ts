export abstract class IAddress {
  public readonly id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public postalCode: string;
  public street: string;
  public number: string;
  public details: string;
  public district: string;
  public city: string;
  public state: string;
  public country: string;
  public enabled: boolean;
}
