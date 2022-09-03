import { components } from '../config';

const { createdResponse, badRequestError, unauthorizedError, conflictError, internalError } =
  components.responses;

export const create = {
  '/patients': {
    post: {
      tags: ['Patients'],
      security: [{ bearerAuth: [] }],
      summary: 'Create patient',
      description: 'Here you can created patient',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                addressId: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                document: { type: 'string' },
                gender: { type: 'string' },
                birthDate: { type: 'string' },
                phone: { type: 'string' },
              },
              required: ['addressId', 'name', 'email', 'document'],
              example: {
                addressId: 1,
                name: 'Sample patient',
                email: 'samplepatient@email.com',
                document: 'sample document',
                gender: 'sample gender',
                birthDate: '18/10/1998',
                phone: 'sample phone',
              },
            },
          },
        },
      },
      responses: {
        '201': createdResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
};
