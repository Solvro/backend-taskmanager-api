import { ProjectRepositoryPort } from "../../../src/modules/project/ports/project.repository.port";
import { Project } from "../../../src/modules/project/interfaces/project.interface";

export class MockProjectRepository implements ProjectRepositoryPort {
  insertOne = async (project: Project): Promise<void> => {
    new Promise<void>((res) => {
      projects.push(project);
      res();
    });
  };

  getOneByProjectId = async (projectId: string): Promise<Project | null> =>
    new Promise<Project | null>((res) => {
      const project: Project | undefined = projects.find(({ _id }) => _id === projectId);
      if (!project) return res(null);
      res(project);
    });

  getManyByUserId = async (userId: string): Promise<Project[]> =>
    new Promise<Project[]>((res) => {
      res(projects.filter((project) => project.userId === userId));
    });

  getOneByProjectAndUserId = async (projectId: string, userId: string): Promise<Project | null> =>
    new Promise<Project | null>((res) => {
      const project: Project | undefined = projects.find(
        (project) => project._id === projectId && project.userId === userId
      );
      if (!project) return res(null);
      res(project);
    });
}

export const projects: Project[] = [];
