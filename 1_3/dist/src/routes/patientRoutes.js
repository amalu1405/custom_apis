"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
// Create Patient
/**
 * @swagger
 * /api/patient:
 *   post:
 *     tags:
 *      - Patient
 *     summary: Create a new patient
 *     description: Add a new patient to the database.
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
 *                 description: The name of the patient.
 *               email:
 *                 type: string
 *                 description: The email address of the patient.
 *     responses:
 *       201:
 *         description: Patient created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patientId:
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
router.post('/api/patient', [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Invalid email address')
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email } = req.body;
    try {
        const result = await db_1.default.query('INSERT INTO patients (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
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
});
// Read Patient
/**
 * @swagger
 * /api/patient/{patientId}:
 *   get:
 *     tags:
 *      - Patient
 *     summary: Get a patient by ID
 *     description: Retrieve a specific patient's details by their ID.
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the patient to retrieve.
 *     responses:
 *       200:
 *         description: Patient retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patientId:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Patient not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/patient/:patientId', [
    (0, express_validator_1.param)('patientId').isInt().withMessage('Patient ID must be a number')
], async (req, res) => {
    // Logic to get a patient by ID
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const patientId = parseInt(req.params.patientId);
    try {
        const result = await db_1.default.query('SELECT * FROM patients WHERE patientId = $1', [patientId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
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
});
// Read Patient Conversations
/**
 * @swagger
 * /api/patient/{patientId}/conversations:
 *   get:
 *     tags:
 *      - Patient
 *     summary: Get a patient conversations by ID
 *     description: Retrieve a specific patient's conversations by their ID.
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the patient to retrieve.
 *     responses:
 *       200:
 *         description: Patient conversations retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 conversations:
 *                   type: array
 *       400:
 *         description: Invalid input.
 *       404:
 *         description: Patient not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/api/patient/:patientId/conversations', [
    (0, express_validator_1.param)('patientId').isInt().withMessage('Patient ID must be a number')
], async (req, res) => {
    // Logic to get a patient by ID
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 'success': false, errors: errors.array() });
    }
    const patientId = parseInt(req.params.patientId);
    try {
        const result1 = await db_1.default.query('SELECT * FROM conversations WHERE patientId = $1', [patientId]);
        const result2 = await db_1.default.query('SELECT * FROM conversationsv2 WHERE patientId = $1', [patientId]);
        if (result1.rows.length === 0 && result2.rows.length === 0) {
            return res.status(404).json({ 'success': false, message: 'Patient not found' });
        }
        res.json({ 'success': true, conversations: result1.rows.concat(result2.rows) });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ 'success': false, 'error': error.message });
        }
        else {
            res.status(500).json({ 'success': false, 'error': 'An unknown error occurred' });
        }
    }
});
exports.default = router;
