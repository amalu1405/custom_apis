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
exports.getTransactionById = exports.updateTransaction = exports.recordTransaction = void 0;
const LedgerService = __importStar(require("../services/ledgerService"));
const recordTransaction = async (req, res) => {
    try {
        const newTransaction = await LedgerService.recordNewTransaction(req.body);
        res.status(201).json(newTransaction);
    }
    catch (error) {
        const message = error.message;
        res.status(400).json({ message });
    }
};
exports.recordTransaction = recordTransaction;
const updateTransaction = async (req, res) => {
    try {
        const updatedTransaction = await LedgerService.updateTransactionDetails(req.params.id, req.body);
        res.status(200).json(updatedTransaction);
    }
    catch (error) {
        const message = error.message;
        res.status(404).json({ message });
    }
};
exports.updateTransaction = updateTransaction;
const getTransactionById = async (req, res) => {
    try {
        const transaction = await LedgerService.getTransactionById(req.params.id);
        if (transaction) {
            res.status(200).json(transaction);
        }
        else {
            res.status(404).json({ message: 'Transaction not found' });
        }
    }
    catch (error) {
        const message = error.message;
        res.status(404).json({ message });
    }
};
exports.getTransactionById = getTransactionById;
