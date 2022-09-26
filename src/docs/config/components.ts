import { security } from './security';

export const components = {
  schemas: {},
  responses: {
    successResponse: { description: 'Success' },
    createdResponse: { description: 'Created' },
    noContentResponse: { description: 'No Content' },
    badRequestError: { description: 'Bad Request' },
    unauthorizedError: { description: 'Unauthorized' },
    forbiddenError: { description: 'Forbidden' },
    notFoundError: { description: 'Not found' },
    conflictError: { description: 'Conflict' },
    internalError: { description: 'Internal server error' },
  },
  ...security,
};
