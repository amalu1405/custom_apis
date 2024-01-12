"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountById = exports.updateAccount = exports.createAccount = void 0;
const account_1 = require("../entities/account");
// This is a mock in-memory storage for demonstration purposes.
const accounts = {};
const createAccount = async (accountData) => {
    const newAccount = new account_1.Account(accountData.username, accountData.email);
    // Store the account in the mock database
    accounts[newAccount.id] = newAccount;
    return newAccount;
};
exports.createAccount = createAccount;
const updateAccount = async (accountId, accountData) => {
    var _a, _b;
    // Check if the account exists
    const existingAccount = accounts[accountId];
    if (!existingAccount) {
        throw new Error('Account not found');
    }
    // Update the account with new data
    existingAccount.username = (_a = accountData.username) !== null && _a !== void 0 ? _a : existingAccount.username;
    existingAccount.email = (_b = accountData.email) !== null && _b !== void 0 ? _b : existingAccount.email;
    // In a real app, persist the changes to the database here
    accounts[accountId] = existingAccount;
    return existingAccount;
};
exports.updateAccount = updateAccount;
const getAccountById = async (accountId) => {
    // Retrieve the account by ID
    const account = accounts[accountId];
    return account || null;
};
exports.getAccountById = getAccountById;
