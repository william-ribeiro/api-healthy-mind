import { components } from '../config';

const { noContentResponse, badRequestError, unauthorizedError, internalError } =
  components.responses;

export const remove = {
  '/address/remove/{addressId}': {
    delete: {
      tags: ['Address'],
      security: [{ bearerAuth: [] }],
      summary: 'Remove address',
      description: 'Here you can removed address',
      parameters: [
        {
          in: 'path',
          name: 'addressId',
          required: true,
          schema: { type: 'string' },
          description: 'Insert id address',
        },
      ],
      responses: {
        '204': noContentResponse,
        '400': badRequestError,
        '401': unauthorizedError,
        '500': internalError,
      },
    },
  },
};
