import { Task, TaskCredentials } from "./interfaces/task";
import { internalLocalStorage } from "../../config/local.storage.config";
import { TaskServicePort } from "./ports/task.service.port";
import { v4 as uuid } from "uuid";
import { TaskState } from "./interfaces/task.state";
import { TaskRepositoryPort } from "./ports/task.repository.port";
import { Project } from "../project/interfaces/project.interface";
import { Resource, ResourceNotFoundError } from "../../utils/error/error.module";


export class TaskService {

  constructor(private taskServiceAdapter: TaskServicePort, private taskRepositoryAdapter: TaskRepositoryPort) {
  }

  addTask = async (taskCredentials: TaskCredentials): Promise<void> => {
    const userId: string = internalLocalStorage.getUserId();

    const generateTask = (): Task => ({
      id: uuid(),
      credentials: taskCredentials,
      state: TaskState.NOT_ASSIGNED,
      createdAt: Date.now(),
      createdBy: {
        userId
      }
    });

    const hasProject: boolean = await this.hasProject(taskCredentials.projectId, userId);

    if (!hasProject)
      throw new ResourceNotFoundError(Resource.PROJECT);

    await this.taskRepositoryAdapter.insertOne(generateTask());
  };

  editTask = async (editedTaskCredentials: TaskCredentials, taskId: string): Promise<Task> => {
    const userId: string = internalLocalStorage.getUserId();
    const hasProject: boolean = await this.hasProject(editedTaskCredentials.projectId, userId);

    if (!hasProject)
      throw new ResourceNotFoundError(Resource.PROJECT);

    const task: Task | null = await this.taskRepositoryAdapter.findOne(taskId);
    if (!task)
      throw new ResourceNotFoundError(Resource.TASK);

    const taskCredentials: TaskCredentials = task.credentials;

    const generateTaskCredentials = (): TaskCredentials => ({
      name: editedTaskCredentials.name || taskCredentials.name,
      projectId: taskCredentials.projectId,
      assignedTo: editedTaskCredentials.assignedTo || taskCredentials.assignedTo,
      estimation: editedTaskCredentials.estimation || taskCredentials.estimation,
      dateRange: editedTaskCredentials.dateRange || taskCredentials.dateRange,
      specialization: editedTaskCredentials.specialization || taskCredentials.specialization
    });

    task.credentials = generateTaskCredentials();
    await this.taskRepositoryAdapter.updateOne(task.credentials, task.id);

    return task;
  };

  private hasProject = (projectId: string, userId: string): Promise<boolean> =>
    this.taskServiceAdapter.findProjectByProjectAndUserId(projectId, userId).then((project: Project) => !!project);


}
