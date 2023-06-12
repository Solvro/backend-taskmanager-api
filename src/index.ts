import "express-async-errors";
import "./config/config";
import { Mongo } from "./utils/db/mongo";
import { appConfig } from "./config/config";
import { logger } from "./utils/logger.utils";
import { app } from "./app";

Mongo.connect(appConfig.MONGO_URL).then(() =>
  app.listen(appConfig.PORT, () => logger.info(`Listening on port ${appConfig.PORT}`))
);
