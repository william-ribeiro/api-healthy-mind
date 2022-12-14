export const CONTAINER = {
  ADDRESS_REPOSITORY: 'AddressRepository',
  PATIENT_REPOSITORY: 'PatientRepository',
  ROLE_REPOSITORY: 'RoleRepository',
  RESOURCE_REPOSITORY: 'ResourceRepository',
  SESSIONS_REPOSITORY: 'SessionRepository',
  CREDENTIALS_REPOSITORY: 'CredentialsRepository',
  USERS_REPOSITORY: 'UsersRepository',
};

export const DATABASE = {
  ADDRESS: 'address',
  PATIENTS: 'patients',
  RESOURCES: 'resources',
  ROLES: 'roles',
  SESSIONS: 'sessions',
  USERS: 'users',
  CREDENTIALS: 'credentials',
  JOIN: {
    SESSION_RESOURCE: 'sessions.resource',
    PATIENT_ADDRESS: 'patients.address',
  },
  ALIAS: {
    SESSION: 'session',
    PATIENT: 'patient',
  },
  VIEWS: {
    CLINICAL_HISTORY: 'clinical_history',
    DASHBOARD: 'dashboard',
  },
};

export const SELECT_FIELDS = {
  SESSION: {
    CATEGORY: `${DATABASE.ALIAS.SESSION}.category`,
    TITLE: `${DATABASE.ALIAS.SESSION}.title`,
    DESCRIPTION: `${DATABASE.ALIAS.SESSION}.description`,
  },
  PATIENT: {
    POSTAL_CODE: `${DATABASE.ALIAS.PATIENT}.postalCode`,
    STREET: `${DATABASE.ALIAS.PATIENT}.street`,
    NUMBER: `${DATABASE.ALIAS.PATIENT}.number`,
    DETAILS: `${DATABASE.ALIAS.PATIENT}.details`,
    DISTRICT: `${DATABASE.ALIAS.PATIENT}.district`,
    CITY: `${DATABASE.ALIAS.PATIENT}.city`,
    STATE: `${DATABASE.ALIAS.PATIENT}.state`,
    COUNTRY: `${DATABASE.ALIAS.PATIENT}.country`,
  },
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

export const ROLE_PROTECTED = {
  Admin: 'Admin',
  Professional: 'Professional',
  Patient: 'Patient',
};

export const CONFIG_PASSWORD = {
  SALT: 8,
};

export const ROLE_IDS = {
  ADMIN: 1,
  PROFESSIONAL: 2,
  PATIENT: 3,
};

export const EMAIL = {
  HOST: 'smtp.gmail.com',
  PORT: 465,
  FROM: process.env.EMAIL_FROM,
  USER: process.env.EMAIL_USER,
};
