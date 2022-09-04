import { components } from '../config';

const { successResponse, badRequestError, unauthorizedError, internalError } = components.responses;

export const listAll = {
  '/patients/list': {
    get: {
      tags: ['Patients'],
      security: [{ bearerAuth: [] }],
      summary: 'List patients',
      description: 'Here you can list all your patients',
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
        '500': internalError,
      },
    },
  },
};
