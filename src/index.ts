import "express-async-errors";
import "./config/config";
import { Mongo } from "./utils/db/mongo";
import { appConfig } from "./config/config";
import { logger } from "./utils/logger.utils";
import { app } from "./app";
import { fetchUsersLoginCredentials, provideAuthData } from "./config/auth.config/auth.config";

const startServer = async () => {
  await fetchUsersLoginCredentials(provideAuthData);
  Mongo.connect(appConfig.MONGO_SERVER_URL).then(() =>
    app.listen(appConfig.PORT, () => logger.info(`Listening on port ${appConfig.PORT}`))
  );
};

startServer();
