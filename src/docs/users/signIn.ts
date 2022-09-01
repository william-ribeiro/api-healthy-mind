import { components } from './../config';

const { successResponse, notFoundError, badRequestError, internalError } = components.responses;

export const signIn = {
  '/signin': {
    post: {
      tags: ['Login'],
      summary: 'Authenticate user',
      description: 'Here you can authenticate user',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                password: { type: 'string' },
              },
              required: ['email', 'password'],
              example: {
                email: 'sample@email.com',
                password: 'sample',
              },
            },
          },
        },
      },
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '404': notFoundError,
        '500': internalError,
      },
    },
  },
};
