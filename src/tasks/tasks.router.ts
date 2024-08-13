import { Router } from "express";
import { taskController } from "./tasks.controller";
import { createValidator, deleteValidator, updateValidator } from "./tasks.validator";


export const tasksRouter: Router = Router()
// GET
tasksRouter.get("/tasks", taskController.getAll);

// POST
tasksRouter.post( "/tasks", createValidator, taskController.create);

// PUT
tasksRouter.put("/tasks/", updateValidator, taskController.update);

// DELETE
tasksRouter.delete("/tasks/", deleteValidator, taskController.delete)
