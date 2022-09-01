export const CONTAINER = {
  USERS_REPOSITORY: 'UsersRepository',
  USER_CREDENTIALS_REPOSITORY: 'UserCredentialsRepository',
};

export const DATABASE = {
  ADDRESS: 'address',
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
  PER_PAGE: 100000,
};
