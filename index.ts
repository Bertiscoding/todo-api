import express, { Express } from "express";
import { DataSource } from "typeorm";
import { Task } from "./src/tasks/tasks.entity";
import { tasksRouter } from "./src/tasks/tasks.router";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";


// Instantiate express app
const app: Express = express();
dotenv.config()

// Parse request as body
app.use(bodyParser.json());

// Cross Origin
app.use(cors())

// Database connection
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  entities: [Task],
  synchronize: true // only for dev purposes
});

// Define server port
const port = process.env.PORT;

AppDataSource.initialize()
  .then(() => {
    // Start listening to requests
    app.listen(port);
    console.log(`Data Source initialized. Listening on port ${process.env.PORT}.`);
  }).catch((err) => console.error("Error during Data Source initialization:", err))

  app.use('/', tasksRouter) // whatever is defined in taskRouter will be added to default route ('/') 
