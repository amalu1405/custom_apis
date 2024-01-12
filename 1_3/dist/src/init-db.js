"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTables = void 0;
const db_1 = __importDefault(require("./db"));
const createTables = async () => {
    const client = await db_1.default.connect();
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
    }
    catch (error) {
        console.error(`Error creating tables: ${error}`);
    }
    finally {
        client.release();
    }
};
exports.createTables = createTables;
