import { response } from '../config';

export const signIn = {
  '/signin': {
    post: {
      tags: ['Login'],
      summary: 'Authenticate user',
      description: 'Here you can authenticate user',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: { type: 'string' },
                password: { type: 'string' },
              },
              required: ['email', 'password'],
              example: {
                email: 'sample@email.com',
                password: 'sample',
              },
            },
          },
        },
      },
      responses: { '200': response[201], '401': response[401], '500': response[500] },
    },
  },
};
