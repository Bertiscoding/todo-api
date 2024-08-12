import express, { Express, Request, Response } from "express";


// Instantiate express app
const app: Express = express();

// Define server port
const port = 3200;

// Create default route
app.get("/", (req: Request, res: Response)=>{
  res.send("Helloooooo");
});

// Start listening to requests
app.listen(port);
