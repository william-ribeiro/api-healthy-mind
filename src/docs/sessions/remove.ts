import { components } from '../config';

const { noContentResponse, badRequestError, unauthorizedError, internalError } =
  components.responses;

export const remove = {
  '/sessions/remove/{sessionId}': {
    delete: {
      tags: ['Sessions'],
      security: [{ bearerAuth: [] }],
      summary: 'Remove session',
      description: 'Here you can removed session',
      parameters: [
        {
          in: 'path',
          name: 'sessionId',
          required: true,
          schema: { type: 'string' },
          description: 'Insert id session',
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
