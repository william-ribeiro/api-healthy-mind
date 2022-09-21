import { components } from '../config';

const { successResponse, badRequestError, unauthorizedError, internalError } = components.responses;

export const filter = {
  '/sessions/filter': {
    get: {
      tags: ['Sessions'],
      security: [{ bearerAuth: [] }],
      summary: 'Filter sessions',
      description: 'Here you can filter all your sessions by subject or service',
      parameters: [
        {
          in: 'query',
          name: 'page',
          required: true,
          schema: { type: 'string' },

          examples: {
            page: { value: '1' },
          },
        },
        {
          in: 'query',
          name: 'field',
          schema: { type: 'string' },

          examples: {
            field: { value: 'remote' },
          },
        },
      ],
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
};
