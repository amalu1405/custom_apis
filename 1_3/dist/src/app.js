"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const conversationRoutes_1 = __importDefault(require("./routes/conversationRoutes"));
const patientRoutes_1 = __importDefault(require("./routes/patientRoutes"));
const doctorRoutes_1 = __importDefault(require("./routes/doctorRoutes"));
const init_db_1 = require("./init-db");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const conversationRoutesV2_1 = __importDefault(require("./routes/conversationRoutesV2"));
(0, init_db_1.createTables)().catch(console.error);
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(conversationRoutes_1.default);
exports.app.use(conversationRoutesV2_1.default);
exports.app.use(patientRoutes_1.default);
exports.app.use(doctorRoutes_1.default);
exports.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
const PORT = process.env.PORT || 3000;
exports.app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
