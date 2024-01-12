"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
/**
 * @swagger
 * /api/v2/conversations:
 *   post:
 *     tags:
 *      - Conversations V2
 *     summary: Create a new conversation
 *     description: Create a new conversation record between a patient and a doctor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - doctorId
 *               - message
 *             properties:
 *               patientId:
 *                 type: integer
 *                 description: The patient's ID.
 *               doctorId:
 *                 type: integer
 *                 description: The doctor's ID.
 *               message:
 *                 type: string
 *                 description: The conversation message.
 *     responses:
 *       201:
 *         description: Conversation created successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/api/v2/conversations', [
    (0, express_validator_1.body)('patientId').isInt().withMessage('Patient ID must be a number'),
    (0, express_validator_1.body)('doctorId').isInt().withMessage('Doctor ID must be a number'),
    (0, express_validator_1.body)('message').notEmpty().withMessage('Message cannot be empty')
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 'success': false, errors: errors.array() });
    }
    // Logic to create a conversation
    const { patientId, doctorId, message } = req.body;
    // Check if patient and doctor exist
    const patientExistsResult = await patientExists(patientId);
    const doctorExistsResult = await doctorExists(doctorId);
    if (!patientExistsResult || !doctorExistsResult) {
        return res.status(404).json({ 'success': false, message: 'Patient or Doctor not found' });
    }
    // Create a new conversation
    try {
        const result = await db_1.default.query('INSERT INTO conversations (patientId, doctorId, message) VALUES ($1, $2, $3) RETURNING *', [patientId, doctorId, message]);
        res.status(201).json({ 'success': true, 'conversationId': result.rows[0].conversationid });
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
async function patientExists(patientId) {
    var _a;
    const result = await db_1.default.query('SELECT * FROM patients WHERE patientId = $1', [patientId]);
    return ((_a = result.rowCount) !== null && _a !== void 0 ? _a : 0) > 0;
}
async function doctorExists(doctorId) {
    var _a;
    const result = await db_1.default.query('SELECT * FROM doctors WHERE doctorId = $1', [doctorId]);
    return ((_a = result.rowCount) !== null && _a !== void 0 ? _a : 0) > 0;
}
exports.default = router;
