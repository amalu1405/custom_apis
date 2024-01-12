// In endpoints/ledgerEndpoints.ts

import express from 'express';
import * as ledgerHandler from '../handlers/ledgerHandler';

const ledgerEndpoints = express.Router();

ledgerEndpoints.post('/', ledgerHandler.recordTransaction);
// ledgerEndpoints.put('/update/:id', ledgerHandler.updateTransaction);
ledgerEndpoints.get('/:userId', ledgerHandler.getTransactionByUserId);
ledgerEndpoints.get('/analytics/:userId', ledgerHandler.getTransactionAnalyticsByUserId);


export { ledgerEndpoints };
