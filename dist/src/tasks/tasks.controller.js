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
exports.TasksController = void 0;
const __1 = require("../..");
const tasks_entity_1 = require("./tasks.entity");
class TasksController {
    constructor(taskRepository = __1.AppDataSource.getRepository(tasks_entity_1.Task)) {
        this.taskRepository = taskRepository;
    } // here: AppDataSource is default value for taskRepository
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let allTasks;
            // Fetch all tasks
            try {
                allTasks = yield this.taskRepository.find({
                    order: {
                        date: "ASC"
                    }
                });
                console.log(allTasks);
                return allTasks;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            ;
        });
    }
}
exports.TasksController = TasksController;
