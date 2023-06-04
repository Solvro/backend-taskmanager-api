import express from "express";
import { errorHandler } from "./error/error.handler";
import cors from "cors";
import { SWAGGER_PATH } from "./swagger/swagger.controller";
import { controllers, healthController, swaggerController } from "./context/context";
import { HEALTH_PATH } from "./health.controller";

export const app = express()
  .disable("x-powered-by")
  .use(cors({}))
  .use(express.json())
  .use(SWAGGER_PATH, swaggerController)
  .use(HEALTH_PATH, healthController)
  .use("/", controllers)
  .use(errorHandler);
