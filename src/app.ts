import express from "express";
import { errorHandler } from "./utils/error/error.handler";
import cors from "cors";
import { SWAGGER_PATH } from "./swagger/swagger.controller";
import { controllers, healthController, swaggerController } from "./context/context";
import { HEALTH_PATH } from "./health.controller";
import { storeUserId } from "./internal.storage/store.user.id";
import { internalLocalStorage } from "./config/local.storage.config";

export const app = express()
  .disable("x-powered-by")
  .use(cors({}))
  .use(express.json())
  .use(SWAGGER_PATH, swaggerController)
  .use(HEALTH_PATH, healthController)
  .use(internalLocalStorage.startStorage)
  .use(storeUserId)
  .use("/", controllers)
  .use(errorHandler);
