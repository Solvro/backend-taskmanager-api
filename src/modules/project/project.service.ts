import { Project, ProjectCredentials } from "./interfaces/project.interface";
import { ProjectRepositoryPort } from "./ports/project.repository.port";
import { v4 as uuid } from "uuid";

export class ProjectService {
  constructor(private projectRepositoryAdapter: ProjectRepositoryPort) {
  }

  addProject = async (projectCredentials: ProjectCredentials): Promise<void> => {
    const generateProject = (): Project => ({
      id: uuid(),
      projectCredentials: {
        name: projectCredentials.name,
        users: projectCredentials.users.map(u => ({ ...u, id: uuid() }))
      }
    });

    await this.projectRepositoryAdapter.insertOne(generateProject());
  };
}
