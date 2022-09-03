import { components } from '../config';

const { createdResponse, badRequestError, internalError, unauthorizedError } = components.responses;

export const create = {
  '/address': {
    post: {
      tags: ['Address'],
      security: [{ bearerAuth: [] }],
      summary: 'Create address',
      description: 'Here you can created address',
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
              required: ['postalCode', 'street', 'number', 'district', 'city', 'state', 'country'],
              example: {
                postalCode: '00000-000',
                street: 'Street sample',
                number: '000',
                details: 'Details sample',
                district: 'District sample',
                city: 'City sample',
                state: 'State sample',
                country: 'Country sample',
              },
            },
          },
        },
      },
      responses: {
        '201': createdResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
};
