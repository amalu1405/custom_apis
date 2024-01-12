import {createAccount, loginAccount }from '../handlers/accountHandler';
import { Request, Response } from 'express';
import * as AccountService from '../services/accountService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock the Express Request and Response objects
const mockRequest = {
    body: {},
} as Request;

const mockResponse = {
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
} as unknown as Response;

jest.mock('../services/accountService', () => ({
    getAccountByEmail: jest.fn(),
    createAccount: jest.fn(),
}));

describe('createAccount', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('should create a new account with valid data', async () => {
        // Mock request body with valid data
        mockRequest.body = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'Test12345',
        };

        // Mock the createAccountService function to return a new account
        (AccountService.createAccount as jest.Mock).mockResolvedValueOnce({
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
        });

        // Call the createAccount function with the mock request and response
        await createAccount(mockRequest, mockResponse);

        // Your test assertions here
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            id: 1,
            username: 'testuser',
            email: 'test@example.com',
        });
    });

    // Add more test cases for createAccount with invalid data, etc.
});

describe('loginAccount', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('should log in a user with valid credentials', async () => {
        // Mock request body with valid credentials
        mockRequest.body = {
            email: 'test@example.com',
            password: 'Test12345',
        };

        // Mock the getAccountByEmail function to return a user
        (AccountService.getAccountByEmail as jest.Mock).mockResolvedValueOnce({
            id: 1,
            email: 'test@example.com',
            password: bcrypt.hashSync('Test12345', 10), // Replace with the actual hashed password
        });

        // Call the loginAccount function with the mock request and response
        await loginAccount(mockRequest, mockResponse);

        // Your test assertions here
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            success: true,
            token: expect.any(String), // Replace with the expected token value
        });
    });

    // Add more test cases for loginAccount with invalid credentials, etc.
});
