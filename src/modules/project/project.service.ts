import { Project, ProjectCredentials, ProjectUser } from "./interfaces/project.interface";
import { ProjectRepositoryPort } from "./ports/project.repository.port";
import { v4 as uuid } from "uuid";
import { internalLocalStorage } from "../../config/local.storage.config";
import { Resource, ResourceNotFoundError } from "../../utils/error/error.module";

export class ProjectService {
  constructor(private projectRepositoryAdapter: ProjectRepositoryPort) {
  }

  addProject = async (projectCredentials: ProjectCredentials): Promise<void> => {
    const userId: string = internalLocalStorage.getUserId();

    const generateProject = (): Project => ({
      _id: uuid(),
      userId,
      projectCredentials: {
        name: projectCredentials.name,
        users: projectCredentials.users.map((u: ProjectUser) => ({ ...u, id: uuid() }))
      }
    });

    await this.projectRepositoryAdapter.insertOne(generateProject());
  };

  getUserProjects = async (): Promise<Project[]> => {
    const userId: string = internalLocalStorage.getUserId();
    const projects: Project[] = await this.projectRepositoryAdapter.getManyByUserId(userId);

    return projects.map(this.mapProject);
  };

  private mapProject = (project: any): Project => ({
    _id: project._id,
    userId: project.userId,
    projectCredentials: project.projectCredentials
  });

  getProject = async (projectId: string): Promise<Project> => {
    const userId: string = internalLocalStorage.getUserId();
    const project: Project | null = await this.projectRepositoryAdapter.getOneByProjectAndUserId(projectId, userId);

    if (!project)
      throw new ResourceNotFoundError(Resource.PROJECT);

    return project;
  };

}
