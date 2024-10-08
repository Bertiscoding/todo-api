"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const tasks_entity_1 = require("./src/tasks/tasks.entity");
const tasks_router_1 = require("./src/tasks/tasks.router");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// Instantiate express app
const app = (0, express_1.default)();
dotenv_1.default.config();
// Parse request as body
app.use(body_parser_1.default.json());
// Cross Origin
app.use((0, cors_1.default)());
// Database connection
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [tasks_entity_1.Task],
    synchronize: true // only for dev purposes
});
// Define server port
const port = process.env.PORT;
exports.AppDataSource.initialize()
    .then(() => {
    // Start listening to requests
    app.listen(port);
    console.log(`Data Source initialized. Listening on port ${process.env.PORT}.`);
}).catch((err) => console.error("Error during Data Source initialization:", err));
app.use('/', tasks_router_1.tasksRouter); // whatever is defined in taskRouter will be added to default route ('/') 
