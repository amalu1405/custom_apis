"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const db_js_1 = __importDefault(require("../db.js"));
const router = express_1.default.Router();
// Create Doctor
/**
 * @swagger
 * /api/doctor:
 *   post:
 *     summary: Create a new doctor
 *     description: Add a new doctor to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the doctor.
 *               email:
 *                 type: string
 *                 description: The email address of the doctor.
 *     responses:
 *       201:
 *         description: Doctor created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctorId:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Internal server error.
 */
router.post('/api/doctor', [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email address')
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email } = req.body;
    try {
        const result = yield db_js_1.default.query('INSERT INTO doctors (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.status(201).json(result.rows[0]);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 'success': false, 'error': error.message });
        }
        else {
            res.status(500).json({ 'success': false, 'error': 'An unknown error occurred' });
        }
    }
}));
// Read Doctor
/**
 * @swagger
 * /api/doctor/{doctorId}:
 *   get:
 *     summary: Get a doctor by ID
 *     description: Retrieve a specific doctor's details by their ID.
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the doctor to retrieve.
 *     responses:
 *       200:
 *         description: Doctor retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctorId:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Doctor not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/doctor/:doctorId', [
    (0, express_validator_1.param)('doctorId').isInt().withMessage('Doctor ID must be a number')
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Logic to get a doctor by ID
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const doctorId = parseInt(req.params.doctorId);
    try {
        const result = yield db_js_1.default.query('SELECT * FROM doctors WHERE doctorId = $1', [doctorId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 'success': false, 'error': error.message });
        }
        else {
            res.status(500).json({ 'success': false, 'error': 'An unknown error occurred' });
        }
    }
}));
exports.default = router;
