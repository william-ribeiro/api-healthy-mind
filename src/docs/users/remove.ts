import { components } from '../config';

const { noContentResponse, badRequestError, unauthorizedError, forbiddenError, internalError } =
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
        '403': forbiddenError,
        '500': internalError,
      },
    },
  },
};
