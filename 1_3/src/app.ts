import 'dotenv/config';

import express from 'express';
import swaggerUi from 'swagger-ui-express';

import conversationRoutes from './routes/conversationRoutes';
import patientRoutes from './routes/patientRoutes';
import doctorRoutes from './routes/doctorRoutes';
import { createTables } from './init-db';

import swaggerJSDoc from 'swagger-jsdoc';
import conversationRoutesV2 from './routes/conversationRoutesV2';

createTables().catch(console.error);

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Patient-Doctor Conversation API',
        version: '1.0.0',
        description: 'API for managing conversation records between patients and doctors',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const app = express();

app.use(express.json());
app.use(conversationRoutes);
app.use(conversationRoutesV2);
app.use(patientRoutes);
app.use(doctorRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
