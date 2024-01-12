import { getRepository } from 'typeorm';
import { LedgerEntry } from '../entities/ledgerEntry';

export const recordNewTransaction = async (transactionData: any): Promise<LedgerEntry> => {
    const ledgerRepository = getRepository(LedgerEntry);
    const newTransaction = ledgerRepository.create({
        accountId: transactionData.accountId,
        amount: transactionData.amount
    });
    await ledgerRepository.save(newTransaction);
    return newTransaction;
};

export const updateTransactionDetails = async (transactionId: string, transactionData: any): Promise<LedgerEntry> => {
    const ledgerRepository = getRepository(LedgerEntry);
    const existingTransaction = await ledgerRepository.findOne(transactionId);
    if (!existingTransaction) {
        throw new Error('Transaction not found');
    }
    ledgerRepository.merge(existingTransaction, transactionData);
    const updatedTransaction = await ledgerRepository.save(existingTransaction);
    return updatedTransaction;
};

export const getTransactionByUserId = async (accountId: string): Promise<LedgerEntry[] | null> => {
    const ledgerRepository = getRepository(LedgerEntry);
    const transactions = await ledgerRepository.find({where: { accountId }});
    return transactions || null;
};