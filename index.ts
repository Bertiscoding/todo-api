import express, { Express, Request, Response } from "express";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { Task } from "./src/tasks/tasks.entity";


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

// Create default route
app.get("/", (req: Request, res: Response)=>{
  res.send("Helloooooo");
});

AppDataSource.initialize()
  .then(() => {
    // Start listening to requests
    app.listen(port);
    console.log("Data Source has been initialized!");
  }).catch((err) => console.error("Error during Data Source initialization:", err))

