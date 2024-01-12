"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountById = exports.updateAccountDetails = exports.createAccount = void 0;
const AccountService = __importStar(require("../services/accountService"));
const createAccount = async (req, res) => {
    try {
        const newAccount = await AccountService.createAccount(req.body);
        res.status(201).json(newAccount);
    }
    catch (error) {
        const message = error.message;
        res.status(400).json({ message });
    }
};
exports.createAccount = createAccount;
const updateAccountDetails = async (req, res) => {
    try {
        const updatedAccount = await AccountService.updateAccount(req.params.id, req.body);
        res.status(200).json(updatedAccount);
    }
    catch (error) {
        const message = error.message;
        res.status(404).json({ message });
    }
};
exports.updateAccountDetails = updateAccountDetails;
const getAccountById = async (req, res) => {
    try {
        const account = await AccountService.getAccountById(req.params.id);
        if (account) {
            res.status(200).json(account);
        }
        else {
            res.status(404).json({ message: 'Account not found' });
        }
    }
    catch (error) {
        const message = error.message;
        res.status(500).json({ message });
    }
};
exports.getAccountById = getAccountById;
