import * as winston from "winston";
import {appConfig} from "./config";


const loggerConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.label({label: "backend"}),
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss"
        }),
        winston.format.json(),
        winston.format.errors({stack: true})
      )
    })
  ],
  exitOnError: false
};

const winstonLogger = winston.createLogger({
  ...loggerConfig, level: appConfig.LEVEL
});

interface LoggerMethod {
  (msg: string, details?: unknown): void;
}

export const logger = {
  error: ((msg, details?) => winstonLogger.error(msg, details)) as LoggerMethod,
  warn: ((msg, details?) => winstonLogger.warn(msg, details)) as LoggerMethod,
  info: ((msg, details?) => winstonLogger.info(msg, details)) as LoggerMethod,
  http: ((msg, details?) => winstonLogger.http(msg, details)) as LoggerMethod,
  verbose: ((msg, details?) =>
    winstonLogger.verbose(msg, details)) as LoggerMethod,
  debug: ((msg, details?) => winstonLogger.debug(msg, details)) as LoggerMethod,
  silly: ((msg, details?) => winstonLogger.silly(msg, details)) as LoggerMethod,
};


