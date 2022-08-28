import { users } from './users';
import { header, security } from './config';
export const apiDocs = {
  ...header,
  paths: {
    ...users,
  },
  ...security,
};
