import { components } from '../config';

const { successResponse, badRequestError, unauthorizedError, internalError } = components.responses;

export const listAll = {
  '/sessions': {
    get: {
      tags: ['Sessions'],
      security: [{ bearerAuth: [] }],
      summary: 'List sessions',
      description: 'Here you can list all your sessions',
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
};
