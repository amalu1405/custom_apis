import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Parse the DB_PORT environment variable to a number, defaulting to 5432 if not set
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;

// Create a new pool using environment variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: dbPort, // Use the parsed port number
});


export default pool;
