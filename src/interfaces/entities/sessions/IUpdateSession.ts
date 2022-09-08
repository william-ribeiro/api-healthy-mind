import { Moment } from 'moment';

export interface IUpdateSession {
  userId?: string;
  patientId?: string;
  status?: string;
  subject?: string;
  duration?: string;
  type?: string;
  comments?: string;
  enabled?: boolean;
  appointmentDate?: Moment;
}
