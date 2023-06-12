import { TaskRepositoryPort } from "./ports/task.repository.port";
import { Task, TaskCredentials } from "./interfaces/task";
import { Mongo } from "../../utils/db/mongo";

export class TaskRepository implements TaskRepositoryPort {
  insertOne = async (task: Task): Promise<void> => {
    await Mongo.tasks().insertOne(task);
  };

  findOne = async (taskId: string): Promise<Task | null> =>
    Mongo.tasks().findOne({ id: taskId });

  updateOne = async (taskCredentials: TaskCredentials, taskId: string): Promise<void> => {
    await Mongo.tasks().updateOne({ id: taskId }, { $set: { credentials: taskCredentials } });
  };

}
