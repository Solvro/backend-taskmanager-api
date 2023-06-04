import { Project } from "../interfaces/project.interface";

export interface ProjectRepositoryPort {
  insertOne: (project: Project) => Promise<void>;
}
