import { IAddress } from '@/interfaces';

export const fakeAddress: IAddress[] = [
  {
    id: 1,
    createdAt: new Date('2021-10-27 00:35:07.294'),
    updatedAt: new Date('2021-10-27 00:35:07.294'),
    postalCode: '11111-111',
    street: 'test street',
    number: 'test number',
    details: 'test details',
    district: 'test centro',
    city: 'test city',
    state: 'test state',
    country: 'test country',
    enabled: true,
  } as IAddress,
  {
    id: 2,
    createdAt: new Date('2021-10-27 00:35:07.294'),
    updatedAt: new Date('2021-10-27 00:35:07.294'),
    postalCode: '22222-222',
    street: 'test street',
    number: 'test number',
    details: 'test details',
    district: 'test centro',
    city: 'test city',
    state: 'test state',
    country: 'test country',
    enabled: true,
  } as IAddress,
  {
    id: 3,
    createdAt: new Date('2021-10-27 00:35:07.294'),
    updatedAt: new Date('2021-10-27 00:35:07.294'),
    postalCode: '33333-333',
    street: 'test street',
    number: 'test number',
    details: 'test details',
    district: 'test centro',
    city: 'test city',
    state: 'test state',
    country: 'test country',
    enabled: true,
  } as IAddress,
  {
    id: 4,
    createdAt: new Date('2021-10-27 00:35:07.294'),
    updatedAt: new Date('2021-10-27 00:35:07.294'),
    postalCode: '44444-444',
    street: 'test street',
    number: 'test number',
    details: 'test details',
    district: 'test centro',
    city: 'test city',
    state: 'test state',
    country: 'test country',
    enabled: false,
  } as IAddress,
];
