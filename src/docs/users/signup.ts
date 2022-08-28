import { response } from './../config';

export const signup = {
  '/signup': {
    post: {
      tags: ['Users'],
      summary: 'Create user',
      description: 'Here you can created user',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
                confirmPassword: { type: 'string' },
              },
              required: ['name', 'email', 'password', 'confirmPassword'],
              example: {
                name: 'user sample',
                email: 'sample@email.com',
                password: 'sample',
                confirmPassword: 'sample',
              },
            },
          },
        },
      },
      responses: { ...response },
    },
  },
};
