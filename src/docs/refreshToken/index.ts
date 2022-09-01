import { components } from '../config';

const { successResponse, badRequestError, unauthorizedError, internalError } = components.responses;

export const refreshToken = {
  '/refresh-token': {
    post: {
      tags: ['RefreshToken'],
      summary: 'Refresh Token',
      description: 'Here you can test the refresh token',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                refreshToken: { type: 'string' },
              },
              required: ['refreshToken'],
              example: {
                refreshToken: 'da21da54da21da54da4da2da5d4sad1s5d4sada1d2ada',
              },
            },
          },
        },
      },
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
};
