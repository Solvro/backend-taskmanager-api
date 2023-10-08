import express from "express";
import { internalLocalStorage } from "../../src/config/local.storage.config";
import { errorHandler } from "../../src/utils/error/error.handler";
import { Controller } from "../../src/context/controller";
import "express-async-errors";
import { storeUserId } from "../../src/internal.storage/store.user.id";
import { auth } from "../../src/auth/auth.request";
import { HASHED_TEST_SECRET_KEY } from "./test.credentials";

const getSecretKeyValueMock = () => HASHED_TEST_SECRET_KEY;

export const appMock = (controllers: Controller[]) =>
  express()
    .use(express.json())
    .use(auth(getSecretKeyValueMock))
    .use(internalLocalStorage.startStorage)
    .use(storeUserId)
    .use(controllers.map((c: Controller) => c.router))
    .use(errorHandler);
