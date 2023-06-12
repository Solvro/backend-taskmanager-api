import { TaskServicePort } from "../modules/task/ports/task.service.port";
import { ProjectRepository } from "../modules/project/project.repository";
import { TaskService } from "../modules/task/task.service";
import { TaskRepository } from "../modules/task/task.repository";
import { TaskController } from "../modules/task/task.controller";
import { TaskControllerPort } from "../modules/task/ports/task.controller.port";

export const getTaskController = () => {
  const taskServiceAdapter: TaskServicePort = {
    findProjectByProjectAndUserId: new ProjectRepository().getOneByProjectAndUserId
  };

  const taskRepository = new TaskRepository();

  const taskService = new TaskService(taskServiceAdapter, taskRepository);

  const taskControllerAdapter: TaskControllerPort = {
    getCurrentTaskState: new TaskRepository().findTaskState
  };

  return new TaskController(taskService, taskControllerAdapter);
};
