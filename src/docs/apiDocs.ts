import { users } from './users';
import { components, header } from './config';
import { refreshToken } from './refreshToken';

export const apiDocs = {
  ...header,
  paths: {
    ...refreshToken,
    ...users,
  },
  components,
};
