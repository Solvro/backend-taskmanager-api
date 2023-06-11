import { Task } from "../interfaces/task";

export interface TaskRepositoryPort {
  insertOne: (task: Task) => Promise<void>;
}
