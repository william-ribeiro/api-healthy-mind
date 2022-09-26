import { components } from '../config';

const { noContentResponse, badRequestError, unauthorizedError, forbiddenError, internalError } =
  components.responses;

export const remove = {
  '/patients/remove/{patientId}': {
    delete: {
      tags: ['Patients'],
      security: [{ bearerAuth: [] }],
      summary: 'Remove patient',
      description: 'Here you can removed patient',
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
        '204': noContentResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '403': forbiddenError,
        '500': internalError,
      },
    },
  },
};
