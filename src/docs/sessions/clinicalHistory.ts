import { components } from '../config';

const { successResponse, badRequestError, unauthorizedError, forbiddenError, internalError } =
  components.responses;

export const clinicalHistory = {
  '/sessions/history-clinical/{patientId}': {
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
        '403': forbiddenError,
        '500': internalError,
      },
    },
  },
};
