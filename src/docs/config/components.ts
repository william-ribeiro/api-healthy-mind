export const components = {
  schemas: {},
  responses: {
    badRequestError: { description: 'Bad Request' },
    createdResponse: { description: 'Created' },
    conflictError: { description: 'User already exists' },
    internalError: { description: 'Internal server error' },
    notFoundError: { description: 'Not found' },
    successResponse: { description: 'Success' },
    unauthorizedError: { description: 'Token is missing' },
  },
};
