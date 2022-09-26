import { components } from '../config';

const {
  successResponse,
  badRequestError,
  unauthorizedError,
  forbiddenError,
  notFoundError,
  conflictError,
  internalError,
} = components.responses;

export const update = {
  '/patients/update/{patientId}': {
    put: {
      tags: ['Patients'],
      security: [{ bearerAuth: [] }],
      summary: 'Update patient',
      description: 'Here you can updated patient',
      parameters: [
        {
          in: 'path',
          name: 'patientId',
          required: true,
          schema: { type: 'string' },
          description: 'Insert id patient',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                document: { type: 'string' },
                gender: { type: 'string' },
                birthDate: { type: 'string' },
                phone: { type: 'string' },
                roleId: { type: 'string' },
                password: { type: 'string' },
                newPassword: { type: 'string' },
                confirmPassowrd: { type: 'string' },
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
              example: {
                name: 'Update sample patient',
                email: 'updatesamplepatient@email.com',
                document: 'update sample document',
                gender: 'update sample gender',
                birthDate: '18/10/1998',
                phone: 'update sample phone',
                password: 'testing',
                newPassword: 'newtesting',
                confirmPassword: 'newtesting',
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
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '403': forbiddenError,
        '404': notFoundError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
};
