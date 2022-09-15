import { IRole } from '../../../src/interfaces';

export const fakeRoles: IRole[] = [
  {
    id: 1,
    createdAt: new Date('2022-09-02T23:32:10.466Z'),
    updatedAt: new Date('2022-09-02T23:32:10.466Z'),
    name: 'Admin',
    enabled: true,
  } as IRole,
  {
    id: 2,
    createdAt: new Date('2022-09-02T23:32:10.466Z'),
    updatedAt: new Date('2022-09-02T23:32:10.466Z'),
    name: 'Professional',
    enabled: true,
  } as IRole,
  {
    id: 3,
    createdAt: new Date('2022-09-02T23:32:10.466Z'),
    updatedAt: new Date('2022-09-02T23:32:10.466Z'),
    name: 'Patient',
    enabled: true,
  } as IRole,
  {
    id: 4,
    createdAt: new Date('2022-09-02T23:32:10.466Z'),
    updatedAt: new Date('2022-09-02T23:32:10.466Z'),
    name: 'Role test',
    enabled: true,
  } as IRole,
  {
    id: 5,
    createdAt: new Date('2022-09-02T23:32:10.466Z'),
    updatedAt: new Date('2022-09-02T23:32:10.466Z'),
    name: 'Old role',
    enabled: false,
  } as IRole,
];
