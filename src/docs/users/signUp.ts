import { components } from './../config';

const { createdResponse, badRequestError, conflictError, internalError } = components.responses;

export const signUp = {
  '/signup': {
    post: {
      tags: ['Users'],
      summary: 'Create user',
      description: 'Here you can created user',
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
              required: ['name', 'email', 'password', 'confirmPassword'],
              example: {
                name: 'user sample',
                email: 'sample@email.com',
                password: 'sample',
                confirmPassword: 'sample',
              },
            },
          },
        },
      },
      responses: {
        '201': createdResponse,
        '400': badRequestError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
};
