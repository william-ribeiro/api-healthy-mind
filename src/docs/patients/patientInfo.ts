import { components } from '../config';

const { successResponse, badRequestError, unauthorizedError, forbiddenError, internalError } =
  components.responses;

export const patientInfo = {
  '/patients/info/{patientId}': {
    get: {
      tags: ['Patients'],
      security: [{ bearerAuth: [] }],
      summary: 'Patient info',
      description: 'Here you can view info your patient',
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
