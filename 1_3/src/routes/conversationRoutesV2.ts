import express, { Request, Response } from 'express';
import { body, validationResult, param } from 'express-validator';
import pool from '../db'


const router = express.Router();


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
 *               - startTime
 *               - endTime
 *               - notes
 *             properties:
 *               patientId:
 *                 type: integer
 *                 description: The patient's ID.
 *               doctorId:
 *                 type: integer
 *                 description: The doctor's ID.
 *               notes:
 *                 type: string
 *                 description: The conversation message.
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: The conversation start time.
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: The conversation end time.
 *     responses:
 *       201:
 *         description: Conversation created successfully.
 *       400:
 *         description: Invalid input.
 */
router.post('/api/v2/conversations',
    [
        body('patientId').isInt().withMessage('Patient ID must be a number'),
        body('doctorId').isInt().withMessage('Doctor ID must be a number'),
        body('notes').notEmpty().withMessage('Message cannot be empty'),
        body('startTime').notEmpty().withMessage('startTime cannot be empty'),
        body('endTime').notEmpty().withMessage('endTime cannot be empty'),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 'success': false, errors: errors.array() });
        }

        // Logic to create a conversation
        const { patientId, doctorId, message, startTime, endTime } = req.body;

        // Check if patient and doctor exist
        const patientExistsResult = await patientExists(patientId);
        const doctorExistsResult = await doctorExists(doctorId);

        if (!patientExistsResult || !doctorExistsResult) {
            return res.status(404).json({ 'success': false, message: 'Patient or Doctor not found' });
        }

        // Create a new conversation
        try {
            const result = await pool.query(
                'INSERT INTO conversations (patientId, doctorId, message) VALUES ($1, $2, $3) RETURNING *',
                [patientId, doctorId, message]
            );
            res.status(201).json({ 'success': true, 'conversationId': result.rows[0].conversationid });
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ 'success': false, 'error': error.message });
            } else {
                res.status(500).json({ 'success': false, 'error': 'An unknown error occurred' });
            }
        }
    }
);

async function patientExists(patientId: number): Promise<boolean> {
    const result = await pool.query('SELECT * FROM patients WHERE patientId = $1', [patientId]);
    return (result.rowCount ?? 0) > 0;
}

async function doctorExists(doctorId: number): Promise<boolean> {
    const result = await pool.query('SELECT * FROM doctors WHERE doctorId = $1', [doctorId]);
    return (result.rowCount ?? 0) > 0;
}

export default router;
