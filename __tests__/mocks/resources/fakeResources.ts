import { IResource } from '@/interfaces';
import { fakeUsers } from '../users';

export const fakeResources: IResource[] = [
  {
    id: 1,
    userId: fakeUsers[0].id,
    createdAt: new Date('2022-09-02T23:32:10.466Z'),
    updatedAt: new Date('2022-09-02T23:32:10.466Z'),
    category: 'Resource category1',
    title: 'Title 1',
    description: 'Resource description1',
    enabled: true,
  } as IResource,
  {
    id: 2,
    userId: fakeUsers[0].id,
    createdAt: new Date('2022-09-02T23:32:10.466Z'),
    updatedAt: new Date('2022-09-02T23:32:10.466Z'),
    category: 'Resource category2',
    title: 'Title 2',
    description: 'Resource description2',
    enabled: true,
  } as IResource,
  {
    id: 3,
    userId: fakeUsers[1].id,
    createdAt: new Date('2022-09-02T23:32:10.466Z'),
    updatedAt: new Date('2022-09-02T23:32:10.466Z'),
    category: 'Resource category3',
    title: 'Title 3',
    description: 'Resource description3',
    enabled: true,
  } as IResource,
  {
    id: 4,
    userId: fakeUsers[0].id,
    createdAt: new Date('2022-09-02T23:32:10.466Z'),
    updatedAt: new Date('2022-09-02T23:32:10.466Z'),
    category: 'Resource category4',
    title: 'Title 4',
    description: 'Resource description4',
    enabled: false,
  } as IResource,
];
