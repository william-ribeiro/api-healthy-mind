import { components } from '../config';

const { successResponse, badRequestError, unauthorizedError, forbiddenError, internalError } =
  components.responses;

export const dashboard = {
  '/dashboard': {
    get: {
      tags: ['Users'],
      security: [{ bearerAuth: [] }],
      summary: 'Dashboard',
      description: 'Here you can view your dashboard',
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
