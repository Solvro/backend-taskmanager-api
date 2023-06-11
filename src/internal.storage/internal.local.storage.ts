import { AsyncLocalStorage } from "async_hooks";
import { logger } from "../utils/logger.utils";
import { InternalServerError } from "../utils/error/error.module";

type UserId = string

export class InternalLocalStorage {
  localStorage = new AsyncLocalStorage<Map<string, any>>();

  startStorage = (req, res, next): void => {
    this.localStorage.run(new Map(), next);
  };

  storeUserId = (userId: UserId): void => {
    this.getStorage().set("userId", userId);
  };

  getUserId = (): UserId => this.getStorage().get("userId");

  private getStorage = (): Map<string, any> => {
    const store = this.localStorage.getStore();

    if (!store) {
      logger.error("Storage wasn't found. Action cannot be completed.");
      throw new InternalServerError();
    }

    return store;
  };
}
