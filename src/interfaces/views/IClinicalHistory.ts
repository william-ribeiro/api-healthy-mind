export abstract class IClinicalHistory {
  public readonly id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public userId: string;
  public patientId: string;
  public status: string;
  public subject: string;
  public duration: string;
  public type: string;
  public enabled: boolean;
  public appointmentDate: Date;
  public service: string;
  public patientName: string;
  public userName: string;
  public resourceCategory: string;
  public resourceTitle: string;
  public resourceDescription: string;
}
