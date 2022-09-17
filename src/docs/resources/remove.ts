import { components } from '../config';

const { noContentResponse, badRequestError, unauthorizedError, internalError } =
  components.responses;

export const remove = {
  '/resources/remove/{resourceId}': {
    delete: {
      tags: ['Resources'],
      security: [{ bearerAuth: [] }],
      summary: 'Remove resource',
      description: 'Here you can removed resource',
      parameters: [
        {
          in: 'path',
          name: 'resourceId',
          required: true,
          schema: { type: 'string' },
          description: 'Insert id resource',
        },
      ],
      responses: {
        '204': noContentResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
};
