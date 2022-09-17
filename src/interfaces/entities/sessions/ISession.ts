export abstract class ISession {
  public readonly id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public userId: string;
  public patientId: string;
  public status: string;
  public subject: string;
  public duration: string;
  public type: string;
  public comments: string;
  public enabled: boolean;
  public appointmentDate: Date;
  public resourceId: number;
  public service: string;
}
