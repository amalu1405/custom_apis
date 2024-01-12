// In helpers/databaseConnection.ts

import { createConnection } from 'typeorm'; // This is an example using TypeORM

export const createDatabaseConnection = async () => {
  return createConnection({
    type: 'postgres', // replace with your database type
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'test',
    entities: [
        __dirname + '/../entities/*.ts'
    ],
    synchronize: true, // note: this should not be used in production
  });
};
