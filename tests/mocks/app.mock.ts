import express from "express";
import { internalLocalStorage } from "../../src/config/local.storage.config";
import { errorHandler } from "../../src/utils/error/error.handler";
import { Controller } from "../../src/context/controller";
import "express-async-errors";
import { storeUserId } from "../../src/internal.storage/store.user.id";
import { auth } from "../../src/auth/auth.request";

export const TEST_USER_ID = "TEST_USER_ID";

jest.mock("../../src/config/auth.config/auth.config.ts", () => ({
  USERS_AUTH_CREDENTIALS: {
    usersCredentials: {
      TEST_USER_ID:
        "24f0e6b07a4048846e66e9d82e76ca9e687611ed22d6bcbdc0d5810ea497f2778d4c1d54711928bd0ee780ff7fe74c7d2ab7462bc26963bdf252c9fa5b2eba0d",
    },
  },
}));

export const appMock = (controllers: Controller[]) =>
  express()
    .use(express.json())
    .use(auth)
    .use(internalLocalStorage.startStorage)
    .use(storeUserId)
    .use(
      "/",
      controllers.map((c: Controller) => c.router)
    )
    .use(errorHandler);
