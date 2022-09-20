import { components } from './../config';

const { successResponse, notFoundError, badRequestError, internalError } = components.responses;

export const signIn = {
  '/signin': {
    post: {
      tags: ['Login'],
      summary: 'Authenticate users and patients',
      description: 'Here you can authenticate user or patient',
      parameters: [
        {
          in: 'query',
          name: 'type',
          required: true,
          schema: { type: 'string' },

          examples: {
            professional: { value: 'professional' },
            patient: { value: 'patient' },
          },
        },
      ],
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
