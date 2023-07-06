import { ProjectService } from "../../../src/modules/project/project.service";
import { ProjectController } from "../../../src/modules/project/project.controller";
import { MockProjectRepository } from "../repositories/project.repository.mock";

export const getMockProjectController = () => {
  const projectService = new ProjectService(new MockProjectRepository());
  return new ProjectController(projectService);
};
