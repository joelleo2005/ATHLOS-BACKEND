'use strict';
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,

  db: {
    connectionString: process.env.DATABASE_URL || undefined,
    host: process.env.PGHOST || 'localhost',
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'athlos',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-no-usar-en-produccion',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  corsOrigin: process.env.CORS_ORIGIN || '*',
};

module.exports = { env };