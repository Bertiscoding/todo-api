import { AppDataSource } from "../..";
import { Task } from "./tasks.entity";
import { instanceToPlain } from "class-transformer";

export class TasksController {
  constructor(private taskRepository = AppDataSource.getRepository(Task)) {} // here: AppDataSource is default value for taskRepository

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  public async getAll(): Promise<Task[]> {
    
    let allTasks: Task[];

    // Fetch all tasks
    try {
      allTasks = await this.taskRepository.find({
        order: {
          date: "ASC"
        }
      });

      allTasks = instanceToPlain(allTasks) as Task[]; // converts tasks instance into array of objects
      return allTasks;
      
    } catch(err){
      console.error(err)
      throw err;
    } ;
  }

}
