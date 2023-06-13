import { TaskServicePort } from "../modules/task/ports/task.service.port";
import { ProjectRepository } from "../modules/project/project.repository";
import { TaskService } from "../modules/task/task.service";
import { TaskRepository } from "../modules/task/task.repository";
import { TaskController } from "../modules/task/task.controller";
import { TaskControllerPort } from "../modules/task/ports/task.controller.port";
import { Project } from "../modules/project/interfaces/project.interface";

export const getTaskController = () => {
  const taskServiceAdapter: TaskServicePort = {
    hasProject: (projectId: string, userId: string) =>
      new ProjectRepository().getOneByProjectAndUserId(projectId, userId).then((project: Project) => !!project)
  };

  const taskRepository = new TaskRepository();

  const taskService = new TaskService(taskServiceAdapter, taskRepository);

  const taskControllerAdapter: TaskControllerPort = {
    getCurrentTaskState: new TaskRepository().findTaskState
  };

  return new TaskController(taskService, taskControllerAdapter);
};
