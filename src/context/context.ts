import { HealthController } from "../health.controller";
import { SwaggerController } from "../swagger/swagger.controller";
import { Controller } from "./controller";
import { ProjectService } from "../modules/project/project.service";
import { ProjectRepository } from "../modules/project/project.repository";
import { ProjectController } from "../modules/project/project.controller";

const projectController = () => {
  const projectService = new ProjectService(new ProjectRepository());
  return new ProjectController(projectService);
};

export const controllers = [projectController()]
  .map((c: Controller) => c.router);

export const swaggerController = new SwaggerController().router;
export const healthController = new HealthController().router;
