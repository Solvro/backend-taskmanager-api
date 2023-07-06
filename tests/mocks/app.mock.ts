import express from "express";
import { internalLocalStorage } from "../../src/config/local.storage.config";
import { errorHandler } from "../../src/utils/error/error.handler";
import { storeDemoUserId } from "./store.user.id.mock";
import { mockControllers } from "./context/context.mock";

export const appMock = (userId: string) =>
  express()
    .use(express.json())
    .use(internalLocalStorage.startStorage)
    .use(storeDemoUserId(userId))
    .use("/", mockControllers)
    .use(errorHandler);
