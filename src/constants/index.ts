export const CONTAINER = {
  ADDRESS_REPOSITORY: 'AddressRepository',
  PATIENT_REPOSITORY: 'PatientRepository',
  SESSIONS_REPOSITORY: 'SessionRepository',
  USER_CREDENTIALS_REPOSITORY: 'UserCredentialsRepository',
  USERS_REPOSITORY: 'UsersRepository',
};

export const DATABASE = {
  ADDRESS: 'address',
  ROLES: 'roles',
  PATIENTS: 'patients',
  SESSIONS: 'sessions',
  USERS: 'users',
  USER_CREDENTIALS: 'user_credentials',
};

export const JWT = {
  EXPIRES_IN_AT: '1h',
  EXPIRES_IN_RT: '30d',
  EXPIRATION_RT_DAYS: 30,

  TYPE: {
    ACCESS_TOKEN: 'AT+JWT',
    REFRESH_TOKEN: 'RT+JWT',
  },
  ALG: 'HS256',
  EXPIRED: 'jwt expired',
};

export const RATE_LIMIT = {
  MAX: 10,
  WINDOWS_MS: 60 * 60 * 1000,
};

export const PAGINATION = {
  OFFSET: 0,
  PAGE: '1',
  PER_PAGE: 10,
};

export const SERVERS = {
  development: {
    url: 'https://staging-api-healthy-mind.herokuapp.com/',
    description: 'Staging Server',
  },
  production: {
    url: 'https://api-healthy-mind.herokuapp.com',
    description: 'Production Server',
  },
  local: {
    url: 'http://localhost:4000',
    description: 'Local Server',
  },
};
