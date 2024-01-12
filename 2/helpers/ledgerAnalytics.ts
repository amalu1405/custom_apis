import { LedgerEntry } from '../entities/ledgerEntry';

export const summarizeTransactions = (transactions: LedgerEntry[]): { totalTransactions: number, totalAmount: number } => {
    let totalAmount = 0;
    transactions.forEach(transaction => {
        totalAmount += transaction.amount;
    });
    return {
        totalTransactions: transactions.length,
        totalAmount
    };
};

export const averageTransactionValue = (transactions: LedgerEntry[]): number => {
    if (transactions.length === 0) return 0;
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    return totalAmount / transactions.length;
};
