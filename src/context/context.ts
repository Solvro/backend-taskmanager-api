import { HealthController } from "../health.controller";
import { SwaggerController } from "../swagger/swagger.controller";
import { Controller } from "./controller";
import { getProjectController } from "./project.context";
import { getTaskController } from "./task.context";
import { getAssignmentController } from "./assignment.context";

export const controllers = [
  getTaskController(),
  getProjectController(),
  getAssignmentController()
]
  .map((c: Controller) => c.router);

export const swaggerController = new SwaggerController().router;
export const healthController = new HealthController().router;
