import { ProjectRepositoryPort } from "../../../src/modules/project/ports/project.repository.port";
import { Project } from "../../../src/modules/project/interfaces/project.interface";

export class MockProjectRepository implements ProjectRepositoryPort {
  insertOne = async (): Promise<void> => {
    await Promise.resolve();
  };

  getOneByProjectId = async (): Promise<Project | null> => Promise.resolve(null);

  getManyByUserId = async (): Promise<Project[]> => Promise.resolve([]);

  getOneByProjectAndUserId = async (): Promise<Project | null> => Promise.resolve(null);
}
