import * as ledgerHandler from '../handlers/ledgerHandler';
import { Request, Response } from 'express';
import { LedgerEntry } from '../entities/ledgerEntry';

// Extend the Express Response type with Jest's mock properties
interface MockResponse extends Response {
  status: jest.Mock<any, any>;
  json: jest.Mock<any, any>;
}

const mockRequest = (body: any): Request => {
    return {
        body: body,
        session: {},
        params: {},
        query: {},
        headers: {},
        get: jest.fn(),
        // ... any other functions or properties used by Express's Request
    } as unknown as Request; // Type assertion to satisfy TypeScript compiler
};

const mockResponse = (): MockResponse => {
    const res: Partial<MockResponse> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as MockResponse;
};

describe('Ledger Handler Tests', () => {
    test('recordTransaction should successfully record a transaction', async () => {
        const req = mockRequest({ amount: 100, accountId: 'acc123' });
        const res = mockResponse();

        await ledgerHandler.recordTransaction(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
        expect(res.json.mock.calls[0][0]).toBeInstanceOf(LedgerEntry);
    });

    // Additional tests for updateTransaction and getTransactionById
});
