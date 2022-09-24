import { address } from './address/index';
import { components, header } from './config';
import { patients } from './patients';
import { refreshToken } from './refreshToken';
import { resources } from './resources';
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
    ...resources,
  },
  components,
};
