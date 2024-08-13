import { validationResult } from "express-validator";
import { AppDataSource } from "../..";
import { Task } from "./tasks.entity";
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

class TasksController {

  // GET route
  public async getAll( req: Request, res: Response ): Promise<Response> {
    
    let allTasks: Task[];

    // Fetch all tasks
    try {
      allTasks = await AppDataSource.getRepository(Task).find({
        order: {
          date: "ASC"
        }
      });

      allTasks = instanceToPlain(allTasks) as Task[]; // converts tasks instance into array of objects
      return res.json(allTasks).status(200);
    } catch(errors){
      return res.json({ error: "Internal Server Error!"}).status(500);
    } ;
  }

  // POST route
  public async create(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);

    const newTask = new Task();
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;

    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask);
      createdTask = instanceToPlain(createdTask) as Task;

      return res.json(createdTask).status(201);
    } catch (errors) {
      return res.json({ error: "Internal Server Error!"}).status(500);
    }
  }

} 

// instead of exporting the class, it exports Instance of the class
export const taskController = new TasksController();
