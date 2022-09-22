export abstract class IDashboard {
  public readonly userId: string;
  public totalPatients: number;
  public totalSessionsIndividual: number;
  public totalSessionsPair: number;
  public totalSessionsGroup: number;
  public totalSessionsScheduledPerDay: number;
  public totalSessionsScheduledPerMonth: number;
  public totalSessionsCanceledPerMonth: number;
}
