import { ProjectService } from "../../../src/modules/project/project.service";
import { ProjectController } from "../../../src/modules/project/project.controller";
import { ProjectRepositoryPort } from "../../../src/modules/project/ports/project.repository.port";

export const getMockProjectController = (mockProjectRepository: ProjectRepositoryPort) => {
  const projectService = new ProjectService(mockProjectRepository);
  return new ProjectController(projectService);
};
