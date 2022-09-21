import { components } from '../config';

const { createdResponse, badRequestError, conflictError, unauthorizedError, internalError } =
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
                name: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                document: {
                  type: 'string',
                },
                gender: {
                  type: 'string',
                },
                birthDate: {
                  type: 'string',
                },
                phone: {
                  type: 'string',
                },
                roleId: {
                  type: 'integer',
                },
                isFirstLogin: {
                  type: 'boolean',
                },
                password: {
                  type: 'string',
                },
                address: {
                  postalCode: {
                    type: 'string',
                  },
                  street: {
                    type: 'string',
                  },
                  number: {
                    type: 'string',
                  },
                  details: {
                    type: 'string',
                  },
                  district: {
                    type: 'string',
                  },
                  city: {
                    type: 'string',
                  },
                  state: {
                    type: 'string',
                  },
                  country: {
                    type: 'string',
                  },
                },
              },
              required: ['name', 'email', 'document'],
              example: {
                name: 'Sample patient',
                email: 'samplepatient@email.com',
                document: 'sample document',
                gender: 'sample gender',
                birthDate: '18/10/1998',
                phone: 'sample phone',
                address: {
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
