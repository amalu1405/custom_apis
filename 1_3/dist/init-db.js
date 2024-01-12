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
exports.createTables = void 0;
const db_js_1 = __importDefault(require("./db.js"));
const createTables = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield db_js_1.default.connect();
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
        yield client.query(createPatientsTable);
        yield client.query(createDoctorsTable);
        yield client.query(createConversationsTable);
        console.log("Tables created successfully");
    }
    catch (error) {
        console.error(`Error creating tables: ${error}`);
    }
    finally {
        client.release();
    }
});
exports.createTables = createTables;
