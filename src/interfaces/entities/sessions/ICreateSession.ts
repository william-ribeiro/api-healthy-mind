export interface ICreateSession {
  userId: string;
  patientId: string;
  status: string;
  subject: string;
  duration: string;
  type: string;
  comments: string;
  appointmentDate: Date;
  resourceId: number;
  service: string;
}
