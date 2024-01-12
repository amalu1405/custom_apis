import { Request, Response } from 'express';
import * as LedgerService from '../services/ledgerService';
import * as LedgerAnalytics from '../helpers/ledgerAnalytics'

export const recordTransaction = async (req: Request, res: Response) => {
    try {
        const newTransaction = await LedgerService.recordNewTransaction(req.body);
        res.status(201).json(newTransaction);
    } catch (error) {
        const message = (error as Error).message;
        res.status(400).json({ message });
    }
};

export const updateTransaction = async (req: Request, res: Response) => {
    try {
        const updatedTransaction = await LedgerService.updateTransactionDetails(req.params.id, req.body);
        res.status(200).json(updatedTransaction);
    } catch (error) {
        const message = (error as Error).message;
        res.status(404).json({ message });
    }
};

export const getTransactionByUserId = async (req: Request, res: Response) => {
    try {
        const transactions = await LedgerService.getTransactionByUserId(req.params.userId);
        if (transactions) {
            res.status(200).json(transactions);
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        const message = (error as Error).message;
        res.status(404).json({ message });
    }
};


export const getTransactionAnalyticsByUserId = async (req: Request, res: Response) => {
    try {
        const transactions = await LedgerService.getTransactionByUserId(req.params.userId);
        if (transactions) {
            const summarizeTransactions = LedgerAnalytics.summarizeTransactions(transactions)
            const averageTransactionValue = LedgerAnalytics.averageTransactionValue(transactions)
            res.status(404).json({summarizeTransactions, averageTransactionValue});
        } else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    } catch (error) {
        const message = (error as Error).message;
        res.status(404).json({ message });
    }
};
