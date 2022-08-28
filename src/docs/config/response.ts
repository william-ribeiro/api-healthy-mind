import { components } from './components';

const { createdResponse, badRequestError, unauthorizedError, conflictError, internalError } =
  components.responses;

export const response = {
  '201': {
    ...createdResponse,
  },
  '400': {
    ...badRequestError,
  },
  '401': {
    ...unauthorizedError,
  },
  '409': {
    ...conflictError,
  },
  '500': {
    ...internalError,
  },
};
