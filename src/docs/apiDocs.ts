import { users } from './users';
import { components, header } from './config';
import { refreshToken } from './refreshToken';
import { address } from './address';

export const apiDocs = {
  ...header,
  paths: {
    ...refreshToken,
    ...users,
    ...address,
  },
  components,
};
