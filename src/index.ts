import "express-async-errors";
import "./utils/config";
import { Mongo } from "./db/mongo";
import { appConfig } from "./utils/config";
import { logger } from "./utils/logger.utils";
import { app } from "./app";

Mongo.connect(appConfig.MONGO_URL).then(() =>
  app.listen(appConfig.PORT, () => logger.info(`Listening on port ${appConfig.PORT}`))
);
