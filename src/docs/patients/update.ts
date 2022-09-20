import { components } from '../config';

const {
  successResponse,
  badRequestError,
  unauthorizedError,
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
              },
              example: {
                addressId: 1,
                name: 'Update sample patient',
                email: 'updatesamplepatient@email.com',
                document: 'update sample document',
                gender: 'update sample gender',
                birthDate: '18/10/1998',
                phone: 'update sample phone',
                password: 'testing',
                newPassword: 'newtesting',
                confirmPassword: 'newtesting',
              },
            },
          },
        },
      },
      responses: {
        '200': successResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '404': notFoundError,
        '409': conflictError,
        '500': internalError,
      },
    },
  },
};
