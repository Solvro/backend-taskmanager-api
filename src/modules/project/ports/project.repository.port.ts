import { Project } from "../interfaces/project.interface";

export interface ProjectRepositoryPort {
  insertOne: (project: Project) => Promise<void>;

  getManyByUserId: (userId: string) => Promise<Project[]>;

  getOneByProjectAndUserId: (projectId: string, userId: string) => Promise<Project | null>;
}
