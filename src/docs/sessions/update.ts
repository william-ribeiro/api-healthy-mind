import { components } from '../config';

const { successResponse, badRequestError, unauthorizedError, notFoundError, internalError } =
  components.responses;

export const update = {
  '/sessions/update/{sessionId}': {
    put: {
      tags: ['Sessions'],
      security: [{ bearerAuth: [] }],
      summary: 'Update session',
      description: 'Here you can updated session',
      parameters: [
        {
          in: 'path',
          name: 'sessionId',
          required: true,
          schema: { type: 'string' },
          description: 'Insert id session',
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                patientId: { type: 'string' },
                status: { type: 'string' },
                subject: { type: 'string' },
                duration: { type: 'string' },
                type: { type: 'string' },
                comments: { type: 'string' },
              },
              example: {
                patientId: 'HERE PATIENT ID',
                status: 'update status',
                subject: 'update subject',
                duration: 'update duration',
                type: 'update type',
                comments: 'update comments',
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
        '500': internalError,
      },
    },
  },
};