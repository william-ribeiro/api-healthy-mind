import { components } from '../config';

const { createdResponse, badRequestError, conflictError, unauthorizedError, internalError } =
  components.responses;

export const create = {
  '/resources': {
    post: {
      tags: ['Resources'],
      security: [{ bearerAuth: [] }],
      summary: 'Create resource',
      description: 'Here you can created resource',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                category: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
              },
              required: ['category', 'title', 'description'],
              example: {
                category: 'Category Sample',
                title: 'Title Sample',
                description: 'Description Sample',
              },
            },
          },
        },
      },
      responses: {
        '201': createdResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
};
