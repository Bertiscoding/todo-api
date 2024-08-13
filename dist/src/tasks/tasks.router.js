"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
const express_1 = require("express");
const tasks_controller_1 = require("./tasks.controller");
const tasks_validator_1 = require("./tasks.validator");
exports.tasksRouter = (0, express_1.Router)();
// GET
exports.tasksRouter.get("/tasks", tasks_controller_1.taskController.getAll);
// POST
exports.tasksRouter.post("/tasks", tasks_validator_1.createValidator, tasks_controller_1.taskController.create);
// PUT
exports.tasksRouter.put("/tasks/", tasks_validator_1.updateValidator, tasks_controller_1.taskController.update);
// DELETE
exports.tasksRouter.delete("/tasks/", tasks_validator_1.deleteValidator, tasks_controller_1.taskController.delete);
