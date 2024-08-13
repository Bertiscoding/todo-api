"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = require("express");
const tasks_controller_1 = require("./tasks.controller");
exports.tasksRouter = (0, express_1.Router)();
exports.tasksRouter.get("/tasks", (req, res) => {
    const taskController = new tasks_controller_1.TasksController(); // new instance
    taskController.getAll();
});
