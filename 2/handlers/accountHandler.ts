import { Request, Response } from 'express';
import { isEmailValid, isPasswordStrong } from '../helpers/authHelper';
import * as AccountService from '../services/accountService';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Account } from 'entities/account';


export const createAccount = async (req: Request, res: Response) => {
    try{
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password || !isEmailValid(email) || !isPasswordStrong(password)) {
            res.status(400).json({ success: false, error: 'Invalid input. Check your data.' });
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword

        // Create user
        const newAccount = await AccountService.createAccount(req.body);

        res.status(201).json(newAccount);
    } catch (error) {
        console.error('Error registering user', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export async function loginAccount(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password || !isEmailValid(email)) {
            res.status(400).json({ success: false, error: 'Invalid email or password.' });
            return;
        }

        // Find the user by email
        const user = await AccountService.getAccountByEmail(email);

        // Check if the user exists
        if (!user) {
            res.status(401).json({ success: false, error: 'Invalid email' });
            return;
        }
        
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ success: false, error: 'Invalid email or password.' });
            return;
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error('Error logging in user', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export const updateAccountDetails = async (req: Request, res: Response) => {
    try {
        const updatedAccount = await AccountService.updateAccount(req.params.id, req.body);
        res.status(200).json(updatedAccount);
    } catch (error) {
            const message = (error as Error).message;
            res.status(404).json({ message });
    }
};

export const getAccountById = async (req: Request, res: Response) => {
    try {
        const account = await AccountService.getAccountById(req.params.id);
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    } catch (error) {
        const message = (error as Error).message;
        res.status(500).json({ message });
    }
};
