export abstract class IDashboard {
  public readonly userId: string;
  public totalPatients: number;
  public totalSessionsIndividual: number;
  public totalSessionsPair: number;
  public totalSessionsGroup: number;
  public totalSessionsScheduledPerDay: number;
  public totalSessionsScheduledPerMoth: number;
  public totalSessionsCanceledPerMoth: number;
}
