import { NextFunction, Response } from "express";
import { AuthRequest } from "../../src/auth/auth.request.interface";
import { internalLocalStorage } from "../../src/config/local.storage.config";

export const DEMO_USER_ID = "DEMO_USER_ID";

export const storeDemoUserId = (userId: string) => (req: AuthRequest, _: Response, next: NextFunction) => {
  internalLocalStorage.storeUserId(userId);
  next();
};
