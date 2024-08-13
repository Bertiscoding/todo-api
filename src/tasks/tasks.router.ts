import { Router } from "express";
import { taskController } from "./tasks.controller";
import { createValidator } from "./tasks.validator";


export const tasksRouter: Router = Router()
// GET
tasksRouter.get("/tasks", taskController.getAll);

// POST
tasksRouter.post( "/tasks", createValidator, taskController.create);
