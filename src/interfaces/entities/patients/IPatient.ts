export abstract class IPatient {
  public readonly id: string;
  public createdAt: Date;
  public updatedAt: Date;
  public userId: string;
  public addressId: number;
  public name: string;
  public email: string;
  public document: string;
  public gender: string;
  public birthDate: string;
  public phone: string;
  public enabled: boolean;
  public roleId: number;
  public password: string;
  public isFirstLogin: boolean;
}
