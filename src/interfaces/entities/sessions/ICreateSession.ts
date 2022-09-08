import { Moment } from 'moment';

export interface ICreateSession {
  userId: string;
  patientId: string;
  status: string;
  subject: string;
  duration: string;
  type: string;
  comments: string;
  appointmentDate: Moment;
}
