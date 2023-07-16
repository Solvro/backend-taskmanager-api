import { ProjectRepositoryPort } from "../../../src/modules/project/ports/project.repository.port";
import { Project } from "../../../src/modules/project/interfaces/project.interface";
import { correctProject } from "../../tests.utils/insert.project";

export class MockProjectRepository implements ProjectRepositoryPort {
  private projects: Project[] = [correctProject];
  insertOne = async (project: Project): Promise<void> => {
    await Promise.resolve();
    this.projects.push(project);
  };

  getOneByProjectId = async (projectId: string): Promise<Project | null> => {
    const project: Project | undefined = this.projects.find(({ _id }) => _id === projectId);
    return Promise.resolve(project || null);
  };

  getManyByUserId = async (userId: string): Promise<Project[]> => {
    return Promise.resolve(this.projects.filter((project) => project.userId === userId));
  };

  getOneByProjectAndUserId = async (projectId: string, userId: string): Promise<Project | null> => {
    const project: Project | undefined = this.projects.find(
      (project) => project._id === projectId && project.userId === userId
    );
    return Promise.resolve(project || null);
  };
}
