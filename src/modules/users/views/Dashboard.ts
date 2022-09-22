import { ViewColumn, ViewEntity } from 'typeorm';
import { DATABASE } from '../../../constants';
import { IDashboard } from '../../../interfaces';

@ViewEntity(DATABASE.VIEWS.DASHBOARD)
export class Dashboard implements IDashboard {
  @ViewColumn()
  public userId: string;
  @ViewColumn()
  public totalPatients: number;
  @ViewColumn()
  public totalSessionsIndividual: number;
  @ViewColumn()
  public totalSessionsPair: number;
  @ViewColumn()
  public totalSessionsGroup: number;
  @ViewColumn()
  public totalSessionsScheduledPerDay: number;
  @ViewColumn()
  public totalSessionsScheduledPerMoth: number;
  @ViewColumn()
  public totalSessionsCanceledPerMoth: number;
}
