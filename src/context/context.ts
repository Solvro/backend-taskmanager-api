import { HealthController } from "../health.controller";
import { SwaggerController } from "../swagger/swagger.controller";
import { Controller } from "./controller";


export const controllers = []
  .map((c: Controller) => c.router);

export const swaggerController = new SwaggerController().router;
export const healthController = new HealthController().router;
