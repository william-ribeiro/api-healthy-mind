import { components } from '../config';

const { successResponse, badRequestError, unauthorizedError, internalError } = components.responses;

export const clinicalHistory = {
  '/sessions/{patientId}': {
    get: {
      tags: ['Sessions'],
      security: [{ bearerAuth: [] }],
      summary: 'Clinical History',
      description: 'Here you can view the entire clinical history of the patient',
      parameters: [
        {
          in: 'path',
          name: 'patientId',
          required: true,
          schema: { type: 'string' },
          description: 'Insert id patient',
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
