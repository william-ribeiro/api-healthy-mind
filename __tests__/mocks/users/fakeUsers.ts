import { IUser } from '../../../src/interfaces';

export const fakeUsers: IUser[] = [
  {
    id: '1aacb860-78f9-4600-a2ba-1536e3b60ce4',
    name: 'User Test 1',
    email: 'email@test1.com',
    createdAt: new Date('2021-10-27 00:35:07.294'),
    updatedAt: new Date('2021-10-27 00:35:07.294'),
    enabled: true,
  } as IUser,
  {
    id: '07350d40-9bb9-4dd0-b63f-ce2f9c77cfa0',
    name: 'User Test 2',
    email: 'email@test2.com',
    createdAt: new Date('2021-10-27 00:35:07.294'),
    updatedAt: new Date('2021-10-27 00:35:07.294'),
    enabled: true,
  } as IUser,
  {
    id: 'a3640f12-563c-4031-b3a1-9958f3fe2b05',
    name: 'User Test 3',
    email: 'email@test3.com',
    createdAt: new Date('2021-10-27 00:35:07.294'),
    updatedAt: new Date('2021-10-27 00:35:07.294'),
    enabled: true,
  } as IUser,
  {
    id: 'a3640f12-563c-4031-b3a1-9958f3fe2b55',
    name: 'User Test 4',
    email: '87454_email@test4.com',
    createdAt: new Date('2021-10-27 00:35:07.294'),
    updatedAt: new Date('2021-10-27 00:35:07.294'),
    enabled: false,
  } as IUser,
];
