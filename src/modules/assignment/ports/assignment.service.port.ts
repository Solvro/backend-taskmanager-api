import { Task } from "../../task/interfaces/task";
import { ProjectUser } from "../../project/interfaces/project.interface";

export interface AssignmentServicePort {
  getNotAssignedTasks: (projectId: string, userId: string) => Promise<Task[]>;
  getClosedTasks: (projectId: string, userId: string) => Promise<Task[]>;
  findDurationForEstimation: (closedTasks: Task[]) => { [estimation: string]: number };
  findProjectUsers: (projectId: string) => Promise<ProjectUser[]>;
  assignTasks: (
    tasksToAssign: Task[],
    estimationToDuration: { [estimation: string]: number },
    users: ProjectUser[],
  ) => { [taskId: string]: { userId: string } };
}
