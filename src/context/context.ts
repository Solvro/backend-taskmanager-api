import { HealthController } from "../health.controller";
import { SwaggerController } from "../swagger/swagger.controller";
import { Controller } from "./controller";
import { getProjectController } from "./project.context";
import { getTaskController } from "./task.project";

export const controllers = [
  getTaskController(),
  getProjectController(),
]
  .map((c: Controller) => c.router);

export const swaggerController = new SwaggerController().router;
export const healthController = new HealthController().router;
