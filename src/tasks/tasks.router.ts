import { Request, Response, Router } from "express";
import { TasksController } from "./tasks.controller";


export const tasksRouter: Router = Router()

tasksRouter.get("/tasks", async (req: Request, res: Response) => {
  const taskController = new TasksController(); // new instance
  const allTasks = await taskController.getAll();

  res.json(allTasks).status(200);
});
