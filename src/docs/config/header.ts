export const header = {
  openapi: '3.0.0',
  info: {
    title: 'API-Healthy-Mind',
    description: 'This is API Healty Mind \n\n Change the BaseURL according to your environment',
    version: '1.0.0',
    contact: {
      email: 'sbrdigital15@gmail.com',
    },
  },
  servers: [
    {
      url: 'https://api-healthy.herokuapp.com',
      description: 'Production Server',
    },
    {
      url: 'http://localhost:4000',
      description: 'Local Server',
    },
  ],
};
