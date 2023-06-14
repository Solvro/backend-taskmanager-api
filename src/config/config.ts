import { config } from "dotenv-flow";
import * as process from "process";

config();

const required = (key: string, variable?: string) => {
  if (!variable)
    throw new Error(`Required property is missing: ${key} on level ${process.env.NODE_ENV}`);
  return variable;
};

export const appConfig = {
  LEVEL: process.env.LEVEL || "info",
  PORT: process.env.PORT || 3000,
  MONGO_SERVER_URL: required("MONGO_SERVER_URL", process.env.MONGO_SERVER_URL),
  MONGO_AUTH_SERVER_URL: required("MONGO_AUTH_SERVER_URL", process.env.MONGO_AUTH_SERVER_URL),
};
