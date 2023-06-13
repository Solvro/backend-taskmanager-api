import { Task, TaskCredentials } from "../interfaces/task";
import { TaskState } from "../interfaces/task.state";

export interface TaskRepositoryPort {
  insertOne: (task: Task) => Promise<void>;
  findOne: (taskId: string, projectId: string, userId: string) => Promise<Task | null>;
  findMany: (projectId: string, userId: string) => Promise<Task[]>;
  updateOne: (taskCredentials: TaskCredentials, taskId: string, projectId: string, userId: string) => Promise<void>;
  updateState: (taskState: TaskState, taskId: string, projectId: string, userId: string) => Promise<void>;
}
