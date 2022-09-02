import { components } from '../config';

const { successResponse, badRequestError, unauthorizedError, notFoundError, internalError } =
  components.responses;

export const update = {
  '/address/update/{addressId}': {
    put: {
      tags: ['Address'],
      security: [{ bearerAuth: [] }],
      summary: 'Update address',
      description: 'Here you can updated address',
      parameters: [
        {
          in: 'path',
          name: 'addressId',
          required: true,
          schema: { type: 'string' },
          description: 'Insert id address',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                postalCode: { type: 'string' },
                street: { type: 'string' },
                number: { type: 'string' },
                details: { type: 'string' },
                district: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
                country: { type: 'string' },
              },
              example: {
                postalCode: 'Update 00000-000',
                street: 'Update Street sample',
                number: 'Update 000',
                details: 'Update Details sample',
                district: 'Update District sample',
                city: 'Update City sample',
                state: 'Update State sample',
                country: 'Update Country sample',
              },
            },
          },
        },
      },
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '404': notFoundError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
};
