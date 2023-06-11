import { TaskRepositoryPort } from "./ports/task.repository.port";
import { Task } from "./interfaces/task";
import { Mongo } from "../../utils/db/mongo";

export class TaskRepository implements TaskRepositoryPort {
  insertOne = async (task: Task): Promise<void> => {
    await Mongo.tasks().insertOne(task);
  };

}
