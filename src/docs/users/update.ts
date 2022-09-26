import { components } from '../config';

const {
  successResponse,
  badRequestError,
  unauthorizedError,
  notFoundError,
  conflictError,
  internalError,
  forbiddenError,
} = components.responses;

export const update = {
  '/users/update': {
    put: {
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      summary: 'Update user',
      description: 'Here you can updated user',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                confirmPassword: { type: 'string' },
              },
              example: {
                name: 'user sample update',
                email: 'sampleupdate@email.com',
                password: 'sample update',
                confirmPassword: 'sample update',
              },
            },
          },
        },
      },
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '403,': forbiddenError,
        '404': notFoundError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
};
