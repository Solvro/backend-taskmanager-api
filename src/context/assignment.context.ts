import { AssignmentRepository } from "../modules/assignment/assignment.repository";
import { AssignmentService } from "../modules/assignment/assignment.service";
import { AssignmentServicePort } from "../modules/assignment/ports/assignment.service.port";
import { Task } from "../modules/task/interfaces/task";
import { AssignmentController } from "../modules/assignment/assignment.controller";
import { TaskRepository } from "../modules/task/task.repository";
import { TaskState } from "../modules/task/interfaces/task.state";
import { findDurationForEstimation } from "../assign.algorithm/find.duration.for.estimation";
import { assignTasks } from "../assign.algorithm/assign.tasks";
import { ProjectRepository } from "../modules/project/project.repository";
import { Project, ProjectUser } from "../modules/project/interfaces/project.interface";
import { shuffleList } from "../utils/sort/random.sort";
import { sortTasksViaEstimation } from "../utils/sort/sort.tasks.via.estimation";

export const getAssignmentController = () => {
  const assignmentRepository = new AssignmentRepository();
  const assignmentServiceAdapter: AssignmentServicePort = {
    getNotAssignedTasks: (projectId: string, userId: string) =>
      new TaskRepository().findManyByState(projectId, userId, TaskState.NOT_ASSIGNED),
    getClosedTasks: (projectId: string, userId: string) =>
      new TaskRepository().findManyByState(projectId, userId, TaskState.CLOSED),
    findDurationForEstimation,
    findProjectUsers: (projectId: string) =>
      new ProjectRepository().getOneByProjectId(projectId)
        .then((pr: Project | null) => pr?.projectCredentials?.users || []),
    assignTasks: (
      tasksToAssign: Task[],
      estimationToDuration: { [estimation: string]: number },
      users: ProjectUser[]) => assignTasks(tasksToAssign, estimationToDuration, users, shuffleList, sortTasksViaEstimation)
  };
  const assignmentService = new AssignmentService(assignmentServiceAdapter, assignmentRepository);

  return new AssignmentController(assignmentService);
};
