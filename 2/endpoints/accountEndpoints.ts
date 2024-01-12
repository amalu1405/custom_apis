// In endpoints/accountEndpoints.ts

import express from 'express';
import * as accountHandler from '../handlers/accountHandler';

const accountEndpoints = express.Router();

accountEndpoints.post('/accounts', accountHandler.createAccount);
accountEndpoints.post('/login', accountHandler.loginAccount);

accountEndpoints.put('/update/:id', accountHandler.updateAccountDetails);
accountEndpoints.get('/:id', accountHandler.getAccountById);

export { accountEndpoints };
