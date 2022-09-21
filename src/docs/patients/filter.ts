import { components } from '../config';

const { successResponse, badRequestError, unauthorizedError, internalError } = components.responses;

export const filter = {
  '/patients/filter': {
    get: {
      tags: ['Patients'],
      security: [{ bearerAuth: [] }],
      summary: 'Filter patients',
      description: 'Here you can filter all your patients by name or email',
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
        {
          in: 'query',
          name: 'field',
          schema: { type: 'string' },

          examples: {
            field: { value: 'patient' },
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
