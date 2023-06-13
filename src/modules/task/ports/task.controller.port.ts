import { TaskState } from "../interfaces/task.state";

export interface TaskControllerPort {
  getCurrentTaskState: (taskId: string, projectId: string, userId: string) => Promise<TaskState | undefined>;
}
