import { ViewColumn, ViewEntity } from 'typeorm';

import { DATABASE } from '@/constants';
import { IClinicalHistory } from '@/interfaces';

@ViewEntity(DATABASE.VIEWS.CLINICAL_HISTORY)
export class ClinicalHistory implements IClinicalHistory {
  @ViewColumn()
  public id: number;
  @ViewColumn()
  public createdAt: Date;
  @ViewColumn()
  public updatedAt: Date;
  @ViewColumn()
  public userId: string;
  @ViewColumn()
  public patientId: string;
  @ViewColumn()
  public status: string;
  @ViewColumn()
  public subject: string;
  @ViewColumn()
  public duration: string;
  @ViewColumn()
  public type: string;
  @ViewColumn()
  public enabled: boolean;
  @ViewColumn()
  public appointmentDate: Date;
  @ViewColumn()
  public service: string;
  @ViewColumn()
  public patientName: string;
  @ViewColumn()
  public userName: string;
  @ViewColumn()
  public resourceCategory: string;
  @ViewColumn()
  public resourceTitle: string;
  @ViewColumn()
  public resourceDescription: string;
}
