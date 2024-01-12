"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const conversationRoutes_js_1 = __importDefault(require("./routes/conversationRoutes.js"));
const patientRoutes_js_1 = __importDefault(require("./routes/patientRoutes.js"));
const doctorRoutes_js_1 = __importDefault(require("./routes/doctorRoutes.js"));
const init_db_js_1 = require("./init-db.js");
const swagger_js_1 = require("./docs/swagger.js");
(0, init_db_js_1.createTables)().catch(console.error);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(conversationRoutes_js_1.default);
app.use(patientRoutes_js_1.default);
app.use(doctorRoutes_js_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_js_1.swaggerSpec));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
