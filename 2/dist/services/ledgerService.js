"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionById = exports.updateTransactionDetails = exports.recordNewTransaction = void 0;
const ledgerEntry_1 = require("../entities/ledgerEntry");
// This is a mock in-memory storage for demonstration purposes.
const ledgerEntries = {};
const recordNewTransaction = async (transactionData) => {
    const newTransaction = new ledgerEntry_1.LedgerEntry(transactionData.accountId, transactionData.amount);
    // Store the transaction in the mock database
    ledgerEntries[newTransaction.id] = newTransaction;
    return newTransaction;
};
exports.recordNewTransaction = recordNewTransaction;
const updateTransactionDetails = async (transactionId, transactionData) => {
    var _a;
    // Check if the transaction exists
    const existingTransaction = ledgerEntries[transactionId];
    if (!existingTransaction) {
        throw new Error('Transaction not found');
    }
    // Update the transaction with new data
    existingTransaction.amount = (_a = transactionData.amount) !== null && _a !== void 0 ? _a : existingTransaction.amount;
    // In a real app, persist the changes to the database here
    ledgerEntries[transactionId] = existingTransaction;
    return existingTransaction;
};
exports.updateTransactionDetails = updateTransactionDetails;
const getTransactionById = async (transactionId) => {
    // Retrieve the transaction by ID
    const transaction = ledgerEntries[transactionId];
    return transaction || null;
};
exports.getTransactionById = getTransactionById;
