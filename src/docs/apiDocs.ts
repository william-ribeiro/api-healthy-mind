import { address } from './address';
import { components, header } from './config';
import { patients } from './patients';
import { refreshToken } from './refreshToken';
import { sessions } from './sessions';
import { users } from './users';

export const apiDocs = {
  ...header,
  paths: {
    ...refreshToken,
    ...users,
    ...address,
    ...patients,
    ...sessions,
  },
  components,
};
