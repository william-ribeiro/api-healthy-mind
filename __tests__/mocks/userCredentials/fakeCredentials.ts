import { IUserCredentials } from '../../../src/interfaces';

export const fakeCredentials: IUserCredentials[] = [
  {
    id: 1,
    userId: '1aacb860-78f9-4600-a2ba-1536e3b60ce4',
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    createdAt: new Date('2022-10-27 00:35:07.294'),
    updatedAt: new Date('2022-10-27 00:35:07.294'),
    expiresIn: new Date('2022-11-27 00:35:07.294'),
    isValid: true,
  } as IUserCredentials,
  {
    id: 2,
    userId: '07350d40-9bb9-4dd0-b63f-ce2f9c77cfa0',
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    createdAt: new Date('2022-10-27 00:35:07.294'),
    updatedAt: new Date('2022-10-27 00:35:07.294'),
    expiresIn: new Date('2022-11-27 00:35:07.294'),
    isValid: true,
  } as IUserCredentials,
  {
    id: 3,
    userId: 'a3640f12-563c-4031-b3a1-9958f3fe2b05',
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    createdAt: new Date('2022-10-27 00:35:07.294'),
    updatedAt: new Date('2022-10-27 00:35:07.294'),
    expiresIn: new Date('2022-11-27 00:35:07.294'),
    isValid: true,
  } as IUserCredentials,
];
