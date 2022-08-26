const local = {
  type: `postgres`,
  url: `${process.env.DATABASE_URL}`,
  migrations: [`${process.env.DATABASE_MIGRATIONS}`],
  entities: [`${process.env.DATABASE_ENTITIES}`],
  cli: {
    migrationsDir: `${process.env.DATABASE_MIGRATIONS_DIR}`,
  },
};

const production = {
  type: `postgres`,
  url: `${process.env.DATABASE_URL}`,
  migrations: [`${process.env.DATABASE_MIGRATIONS}`],
  entities: [`${process.env.DATABASE_ENTITIES}`],
  cli: {
    migrationsDir: `${process.env.DATABASE_MIGRATIONS_DIR}`,
  },

  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

let config = null;
switch (process.env.NODE_ENV) {
  case 'production':
    config = production;
    break;
  case 'local':
    config = local;
    break;
}
module.exports = config;
