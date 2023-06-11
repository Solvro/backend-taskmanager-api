import { Project } from "../../project/interfaces/project.interface";

export interface TaskServicePort {
  findProjectByProjectAndUserId: (projectId: string, userId: string) => Promise<Project | null>;
}
