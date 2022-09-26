import { components } from '../config';

const {
  successResponse,
  badRequestError,
  unauthorizedError,
  conflictError,
  notFoundError,
  forbiddenError,
  internalError,
} = components.responses;

export const update = {
  '/resources/update/{resourceId}': {
    put: {
      tags: ['Resources'],
      security: [{ bearerAuth: [] }],
      summary: 'Update resource',
      description: 'Here you can updated resource',
      parameters: [
        {
          in: 'path',
          name: 'resourceId',
          required: true,
          schema: { type: 'string' },
          description: 'Insert id resource',
        },
      ],
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
              example: {
                category: 'update category',
                title: 'update title',
                description: 'update description',
              },
            },
          },
        },
      },
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '403': forbiddenError,
        '404': notFoundError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
};
