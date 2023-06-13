import { Task, TaskCredentials } from "./interfaces/task";
import { internalLocalStorage } from "../../config/local.storage.config";
import { TaskServicePort } from "./ports/task.service.port";
import { v4 as uuid } from "uuid";
import { TaskState } from "./interfaces/task.state";
import { TaskRepositoryPort } from "./ports/task.repository.port";
import { Resource, ResourceNotFoundError } from "../../utils/error/error.module";
import { Project } from "../project/interfaces/project.interface";


export class TaskService {

  constructor(private taskServiceAdapter: TaskServicePort, private taskRepositoryAdapter: TaskRepositoryPort) {
  }

  addTask = async (taskCredentials: TaskCredentials, projectId: string): Promise<void> => {
    const userId: string = internalLocalStorage.getUserId();

    const hasProject: boolean = await this.taskServiceAdapter.hasProject(projectId, userId);
    if (!hasProject)
      throw new ResourceNotFoundError(Resource.PROJECT);

    const generateTask = (): Task => ({
      id: uuid(),
      projectId,
      credentials: taskCredentials,
      state: TaskState.NOT_ASSIGNED,
      createdAt: Date.now(),
      createdBy: { userId }
    });

    await this.taskRepositoryAdapter.insertOne(generateTask());
  };

  editTaskState = async (taskState: TaskState, taskId: string, projectId: string): Promise<Task> => {
    const userId: string = internalLocalStorage.getUserId();
    const task: Task | null = await this.getTask(taskId, projectId, userId);

    await this.taskRepositoryAdapter.updateState(taskState, taskId, projectId, userId);

    return this.mapTask(task);
  };

  editTask = async (editedTaskCredentials: TaskCredentials, taskId: string, projectId: string): Promise<Task> => {
    const userId: string = internalLocalStorage.getUserId();

    const task: Task = await this.getTask(taskId, projectId, userId);

    const generateTaskCredentials = (): TaskCredentials => ({
      name: editedTaskCredentials.name || task.credentials.name,
      assignedTo: editedTaskCredentials.assignedTo || task.credentials.assignedTo,
      estimation: editedTaskCredentials.estimation || task.credentials.estimation,
      dateRange: editedTaskCredentials.dateRange || task.credentials.dateRange,
      specialization: editedTaskCredentials.specialization || task.credentials.specialization
    });

    task.credentials = generateTaskCredentials();
    await this.taskRepositoryAdapter.updateOne(task.credentials, taskId, projectId, userId);

    return this.mapTask(task);
  };

  getProjectTasks = async (projectId: string): Promise<Task[]> => {
    const userId: string = internalLocalStorage.getUserId();
    const tasks: Task[] = await this.taskRepositoryAdapter.findMany(projectId, userId);
    return tasks.map(this.mapTask);
  };

  private getTask = async (taskId: string, projectId: string, userId: string): Promise<Task> => {
    const task: Task | null = await this.taskRepositoryAdapter.findOne(taskId, projectId, userId);

    if (!task)
      throw new ResourceNotFoundError(Resource.TASK);

    return this.mapTask(task);
  };

  private mapTask = (task: any): Task => ({
    id: task.id,
    projectId: task.projectId,
    state: task.state,
    createdAt: task.createdAt,
    createdBy: task.createdBy,
    credentials: task.credentials
  });
}
