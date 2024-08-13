"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const express_validator_1 = require("express-validator");
const __1 = require("../..");
const tasks_entity_1 = require("./tasks.entity");
const class_transformer_1 = require("class-transformer");
class TasksController {
    // GET route
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let allTasks;
            // Fetch all tasks
            try {
                allTasks = yield __1.AppDataSource.getRepository(tasks_entity_1.Task).find({
                    order: {
                        date: "ASC"
                    }
                });
                allTasks = (0, class_transformer_1.instanceToPlain)(allTasks); // converts tasks instance into array of objects
                return res.json(allTasks).status(200);
            }
            catch (errors) {
                return res.json({ error: "Internal Server Error!" }).status(500);
            }
            ;
        });
    }
    // POST route
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            const newTask = new tasks_entity_1.Task();
            newTask.title = req.body.title;
            newTask.date = req.body.date;
            newTask.description = req.body.description;
            newTask.priority = req.body.priority;
            newTask.status = req.body.status;
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let createdTask;
            try {
                createdTask = yield __1.AppDataSource.getRepository(tasks_entity_1.Task).save(newTask);
                createdTask = (0, class_transformer_1.instanceToPlain)(createdTask);
                return res.json(createdTask).status(201);
            }
            catch (errors) {
                return res.json({ error: "Internal Server Error!" }).status(500);
            }
        });
    }
}
// instead of exporting the class, it exports Instance of the class
exports.taskController = new TasksController();
