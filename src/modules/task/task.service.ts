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

    const project: Project | null = await this.taskServiceAdapter.findProjectByProjectAndUserId(taskCredentials.projectId, userId);

    if (!project)
      throw new ResourceNotFoundError(Resource.PROJECT);

    await this.taskRepositoryAdapter.insertOne(generateTask());
  };
}
