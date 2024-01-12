import request from 'supertest';
import { app } from '../../src/app'; // Import your Express application
import pool from '../../src/db'; // Import your database client

describe('Conversations API', () => {
    beforeAll(async () => {
        await pool.query('DELETE FROM conversationsv2');
        await pool.query('DELETE FROM conversations');
        await pool.query('DELETE FROM doctors');
        await pool.query('DELETE FROM patients');
    });
    afterAll(async () => {
        // await pool.end(); // Close database connection after tests
    });

    describe('POST /api/conversations', () => {
        it('should validate patientId', async () => {
            const newConversation = {
                doctorId: 1,
                message: 'Test message',
            };

            const response = await request(app)
                .post('/api/conversations')
                .send(newConversation);

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('errors', [
                {
                    type: 'field',
                    msg: 'Patient ID must be a number',
                    path: 'patientId',
                    location: 'body'
                }
            ]);
        });

        it('should validate doctorId', async () => {
            const newConversation = {
                patientId: 1,
                message: 'Test message',
            };

            const response = await request(app)
                .post('/api/conversations')
                .send(newConversation);

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('errors', [
                {
                    type: 'field',
                    msg: 'Doctor ID must be a number',
                    path: 'doctorId',
                    location: 'body'
                }
            ]);
        });

        it('should validate message', async () => {
            const newConversation = {
                patientId: 1,
                doctorId: 1,
            };

            const response = await request(app)
                .post('/api/conversations')
                .send(newConversation);

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('errors', [
                {
                    type: 'field',
                    msg: 'Message cannot be empty',
                    path: 'message',
                    location: 'body'
                }
            ]);
        });


        it('should throw 404 if patient or doctor not found', async () => {
            const newConversation = {
                patientId: 1,
                doctorId: 1,
                message: 'Test message',
            };

            const response = await request(app)
                .post('/api/conversations')
                .send(newConversation);

            console.log(response.body)

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('message', 'Patient or Doctor not found');
        });

        it('should create a new conversation', async () => {
            const doctor = await pool.query(
                'INSERT INTO doctors (name, email) VALUES ($1, $2) RETURNING *',
                ["doctorName", "doctor@email.com"]
            );

            const doctorId = doctor.rows[0].doctorid

            const patient = await pool.query(
                'INSERT INTO patients (name, email) VALUES ($1, $2) RETURNING *',
                ["patientName", "patient@email.com"]
            );

            const patientId = patient.rows[0].patientid

            const newConversation = {
                patientId: patientId,
                doctorId: doctorId,
                message: 'Test message',
            };

            console.log(newConversation)

            const response = await request(app)
                .post('/api/conversations')
                .send(newConversation);

            const conversation = await pool.query(
                'SELECT * FROM conversations WHERE doctorId = $1 AND patientId = $2',
                [doctorId, patientId]
            );

            const conversationId = conversation.rows[0].conversationid;

            console.log("response", response.body)

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('conversationId', conversationId);
        });

    });

    describe('GET /api/conversations/:conversationId', () => {
        it('should validate conversationId', async () => {

            const response = await request(app)
                .get('/api/conversations/abc')
                .send();

            console.log(response.body)

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('errors', [
                {
                    type: 'field',
                    msg: 'Conversation ID must be a number',
                    path: 'conversationId',
                    location: 'params',
                    "value": "abc",
                }
            ]);
        });

        it('should throw 404 if conversationId not found', async () => {
            const response = await request(app)
                .get('/api/conversations/12')
                .send();

            console.log(response.body)

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('message', "Conversation not found");
        });

        it('should get conversation', async () => {
            const doctor = await pool.query(
                'INSERT INTO doctors (name, email) VALUES ($1, $2) RETURNING *',
                ["doctorName1", "doctor1@email.com"]
            );

            const doctorId = doctor.rows[0].doctorid

            const patient = await pool.query(
                'INSERT INTO patients (name, email) VALUES ($1, $2) RETURNING *',
                ["patientName1", "patient1@email.com"]
            );

            const patientId = patient.rows[0].patientid


            const conversation = await pool.query(
                'INSERT INTO conversations (patientId, doctorId, message) VALUES ($1, $2, $3) RETURNING *',
                [patientId, doctorId, "Test message"]
            );

            const conversationId = conversation.rows[0].conversationid;

            const response = await request(app)
                .get('/api/conversations/' + conversationId)
                .send();

            console.log(response.body)

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('conversation', 'Test message');
        });

    });

});

describe('Doctors API', () => {
    beforeAll(async () => {
        await pool.query('DELETE FROM conversationsv2');
        await pool.query('DELETE FROM conversations');
        await pool.query('DELETE FROM doctors');
        await pool.query('DELETE FROM patients');
    });
    afterAll(async () => {
        // await pool.end(); // Close database connection after tests
    });

    describe('GET /api/doctor/:doctorId/average-duration', () => {
        it('should validate doctorId', async () => {

            const response = await request(app)
                .get('/api/doctor/abc/average-duration')
                .send();

            console.log(response.body)

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('errors', [
                {
                    type: 'field',
                    msg: 'Doctor ID must be a number',
                    path: 'doctorId',
                    location: 'params',
                    "value": "abc",
                }
            ]);
        });

        it('should throw 404 if doctorId not found', async () => {
            const response = await request(app)
                .get('/api/doctor/17/average-duration')
                .send();

            console.log(response.body)

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('success', false);
            expect(response.body).toHaveProperty('message', "Doctor not found");
        });

        it('should get average duration', async () => {
            const doctor = await pool.query(
                'INSERT INTO doctors (name, email) VALUES ($1, $2) RETURNING *',
                ["doctorName1", "doctor1@email.com"]
            );

            const doctorId = doctor.rows[0].doctorid

            const patient = await pool.query(
                'INSERT INTO patients (name, email) VALUES ($1, $2) RETURNING *',
                ["patientName1", "patient1@email.com"]
            );

            const patientId = patient.rows[0].patientid


            const conversation1 = await pool.query(
                'INSERT INTO conversationsv2 (patientId, doctorId, notes, startTime, endTime) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [patientId, doctorId, "Test message", "2024-01-12T20:05:08.797Z", "2024-01-12T20:15:08.797Z"]
            ); // 10 minutes = 600 secs

            const conversation2 = await pool.query(
                'INSERT INTO conversationsv2 (patientId, doctorId, notes, startTime, endTime) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [patientId, doctorId, "Test message 2", "2024-01-12T20:45:08.797Z", "2024-01-12T20:54:18.797Z"]
            ); // 9 mins 10 secs = 550 secs

            const conversationId1 = conversation1.rows[0].conversationid;
            const conversationId2 = conversation2.rows[0].conversationid;

            const response = await request(app)
                .get('/api/doctor/' + doctorId + '/average-duration')
                .send();

            console.log(response.body)

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('averageDuration', 575);
        });

    });

});