import pool from './db'

export const createTables = async () => {
    const client = await pool.connect();

    try {
        const createPatientsTable = `
            CREATE TABLE IF NOT EXISTS patients (
                patientId SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE
            );
        `;

        const createDoctorsTable = `
            CREATE TABLE IF NOT EXISTS doctors (
                doctorId SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE
            );
        `;

        const createConversationsTable = `
            CREATE TABLE IF NOT EXISTS conversations (
                conversationId SERIAL PRIMARY KEY,
                patientId INT,
                doctorId INT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                message TEXT,
                FOREIGN KEY (patientId) REFERENCES patients(patientId),
                FOREIGN KEY (doctorId) REFERENCES doctors(doctorId)
            );
        `;

        const createConversationsTableV2 = `
            CREATE TABLE IF NOT EXISTS conversationsv2 (
                conversationId SERIAL PRIMARY KEY,
                patientId INT,
                doctorId INT,
                startTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                endTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                notes TEXT,
                FOREIGN KEY (patientId) REFERENCES patients(patientId),
                FOREIGN KEY (doctorId) REFERENCES doctors(doctorId)
            );
        
        `;

        await client.query(createPatientsTable);
        await client.query(createDoctorsTable);
        await client.query(createConversationsTable);
        await client.query(createConversationsTableV2);

        console.log("Tables created successfully");

    } catch (error) {
        console.error(`Error creating tables: ${error}`);
    } finally {
        client.release();
    }
};
