import { components } from '../config';

const { createdResponse, badRequestError, unauthorizedError, internalError } = components.responses;

export const create = {
  '/sessions': {
    post: {
      tags: ['Sessions'],
      security: [{ bearerAuth: [] }],
      summary: 'Create session',
      description: 'Here you can created session',
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
                appointmentDate: { type: 'timestamp' },
              },
              required: [
                'patientId',
                'status',
                'subject',
                'duration',
                'type',
                'comments',
                'appointmentDate',
              ],
              example: {
                patientId: 'HERE PATIENT ID',
                status: 'Agendado',
                subject: 'Conflito',
                duration: '00:30',
                type: 'Individual',
                comments: 'Agendamento de sessão',
                appointmentDate: '2022-09-15 16:00',
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
