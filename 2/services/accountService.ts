import { getRepository } from 'typeorm';
import { Account } from '../entities/account';

export const createAccount = async (accountData: any): Promise<Account> => {
    const accountRepository = getRepository(Account);
    const newAccount = accountRepository.create({
        username: accountData.username,
        email: accountData.email,
        password: accountData.password
    });
    await accountRepository.save(newAccount);
    return newAccount;
};

export const updateAccount = async (accountId: string, accountData: any): Promise<Account> => {
    const accountRepository = getRepository(Account);
    const existingAccount = await accountRepository.findOne(accountId);
    if (!existingAccount) {
        throw new Error('Account not found');
    }
    accountRepository.merge(existingAccount, accountData);
    const updatedAccount = await accountRepository.save(existingAccount);
    return updatedAccount;
};

export const getAccountById = async (accountId: string): Promise<Account | null> => {
    const accountRepository = getRepository(Account);
    const account = await accountRepository.findOne(accountId);
    return account || null;
};

export const getAccountByEmail = async (email: string): Promise<Account | null> => {
    const accountRepository = getRepository(Account);
    const account = await accountRepository.findOne({email});
    return account || null;
};
