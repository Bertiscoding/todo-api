import { validationResult } from "express-validator";
import { AppDataSource } from "../..";
import { Task } from "./tasks.entity";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { DeleteResult, UpdateResult } from "typeorm";

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
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTask = new Task();
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.description = req.body.description;
    newTask.priority = req.body.priority;
    newTask.status = req.body.status;
  
    let createdTask: Task;

    try {
      createdTask = await AppDataSource.getRepository(Task).save(newTask);
      createdTask = instanceToPlain(createdTask) as Task;

      return res.json(createdTask).status(201);
    } catch (errors) {
      return res.json({ error: "Internal Server Error!"}).status(500);
    }
  }

  // PUT route
  public async update(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // find task and get id
    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id }
      })
    } catch (error) {
      return res.json({ error: "Internal Server Error!"}).status(500);
    }

    if(!task) {
      return res.json({ error: "Task with given ID does not exist"}).status(404);
    }

    let updatedTask: UpdateResult; // from TypeORM

    try {
      updatedTask = await AppDataSource.getRepository(Task).update(
        req.body.id, plainToInstance(Task, plainToInstance(Task, {
          status: req.body.status
        }))
      );

      updatedTask = instanceToPlain(updatedTask) as UpdateResult;

      return res.json(updatedTask).status(200);
    } catch (error) {
      return res.json({ error: "Internal Server Error!"}).status(500);
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // find task and get id
    let task: Task | null;

    try {
      task = await AppDataSource.getRepository(Task).findOne({
        where: { id: req.body.id }
      })
    } catch (error) {
      return res.json({ error: "Internal Server Error!"}).status(500);
    }

    if(!task) {
      return res.json({ error: "Task with given ID does not exist"}).status(404);
    }

    let deletedTask: DeleteResult;

    try {
      deletedTask = await AppDataSource.getRepository(Task).delete(
        req.body.id
      );

      return res.json(deletedTask).status(200);
    } catch (error) {
      return res.json({ error: "Internal Server Error!"}).status(500);
    }

  }

} 

// instead of exporting the class, it exports Instance of the class
export const taskController = new TasksController();
