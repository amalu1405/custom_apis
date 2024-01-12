import express, { Application } from 'express';
import 'reflect-metadata';

import { createDatabaseConnection } from './helpers/databaseConnection';
import { accountEndpoints } from './endpoints/accountEndpoints';
import { ledgerEndpoints } from './endpoints/ledgerEndpoints';


const server: Application = express();

server.use(express.json());

createDatabaseConnection().then(() => {
    console.log('Database successfully connected');
});

server.use('/api', accountEndpoints);
server.use('/api/transactions', ledgerEndpoints);

const SERVER_PORT = process.env.PORT || 3000;

server.listen(SERVER_PORT, () => {
    console.log(`Server operational at http://localhost:${SERVER_PORT}`);
});

export default server;
