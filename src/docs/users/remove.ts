import { components } from '../config';

const { noContentResponse, badRequestError, unauthorizedError, internalError } =
  components.responses;

export const remove = {
  '/users/remove': {
    delete: {
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      summary: 'Remove user',
      description: 'Here you can removed user',
      responses: {
        '204': noContentResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
};
