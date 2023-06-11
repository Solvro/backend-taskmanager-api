import { ProjectService } from "../modules/project/project.service";
import { ProjectRepository } from "../modules/project/project.repository";
import { ProjectController } from "../modules/project/project.controller";

export const getProjectController = () => {
  const projectService = new ProjectService(new ProjectRepository());
  return new ProjectController(projectService);
};
