import { Task, TaskCredentials } from "../interfaces/task";

export interface TaskRepositoryPort {
  insertOne: (task: Task) => Promise<void>;
  findOne: (taskId: string) => Promise<Task | null>;
  updateOne: (taskCredentials: TaskCredentials, taskId: string) => Promise<void>;
}
