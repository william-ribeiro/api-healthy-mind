import { IDashboard } from '@/interfaces';
import { fakeUsers } from './fakeUsers';

export const fakeDashboard: IDashboard[] = [
  {
    userId: fakeUsers[1].id,
    totalPatients: 2,
    totalSessionsIndividual: 11,
    totalSessionsPair: 22,
    totalSessionsGroup: 24,
    totalSessionsScheduledPerDay: 33,
    totalSessionsScheduledPerMonth: 22,
    totalSessionsCanceledPerMonth: 2,
  } as IDashboard,
  {
    userId: fakeUsers[2].id,
    totalPatients: 5,
    totalSessionsIndividual: 11,
    totalSessionsPair: 21,
    totalSessionsGroup: 14,
    totalSessionsScheduledPerDay: 1,
    totalSessionsScheduledPerMonth: 11,
    totalSessionsCanceledPerMonth: 7,
  } as IDashboard,
];
