import { TaskRepositoryPort } from "./ports/task.repository.port";
import { Task, TaskCredentials } from "./interfaces/task";
import { Mongo } from "../../utils/db/mongo";
import { TaskState } from "./interfaces/task.state";

export class TaskRepository implements TaskRepositoryPort {
  insertOne = async (task: Task): Promise<void> => {
    await Mongo.tasks().insertOne(task);
  };

  findOne = async (taskId: string, projectId: string, userId: string): Promise<Task | null> =>
    Mongo.tasks().findOne({ _id: taskId, projectId, createdBy: { userId } });

  findMany = async (projectId: string, userId: string): Promise<Task[]> =>
    Mongo.tasks().find({ projectId, createdBy: { userId } }).toArray();

  findManyByState = async (projectId: string, userId: string, taskState: TaskState): Promise<Task[]> =>
    Mongo.tasks().find({ projectId, createdBy: { userId }, state: taskState }).toArray();

  findTaskState = async (taskId: string, projectId: string, userId: string): Promise<TaskState | undefined> =>
    this.findOne(taskId, projectId, userId).then(task => task?.state);

  updateOne = async (taskCredentials: TaskCredentials, taskId: string): Promise<void> => {
    await Mongo.tasks().updateOne({ _id: taskId }, { $set: { credentials: taskCredentials } });
  };

  updateState = async (taskState: TaskState, taskId: string, projectId: string, userId: string): Promise<void> => {
    await Mongo.tasks().updateOne({
      _id: taskId,
      projectId,
      createdBy: { userId }
    }, { $set: { state: taskState } });
  };

}
