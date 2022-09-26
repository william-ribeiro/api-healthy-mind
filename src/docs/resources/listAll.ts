import { components } from '../config';

const { successResponse, badRequestError, unauthorizedError, forbiddenError, internalError } =
  components.responses;

export const listAll = {
  '/resources/list': {
    get: {
      tags: ['Resources'],
      security: [{ bearerAuth: [] }],
      summary: 'List resources',
      description: 'Here you can list all your resources',
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
      ],
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '403': forbiddenError,
        '500': internalError,
      },
    },
  },
};
