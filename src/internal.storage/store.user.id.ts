import { NextFunction, Response } from "express";
import { AuthRequest } from "../auth/auth.request.interface";
import { internalLocalStorage } from "../config/local.storage.config";

export const storeUserId = (req: AuthRequest, _: Response, next: NextFunction) => {
  const userId: string = req.get("user-id") as string;
  internalLocalStorage.storeUserId(userId);
  next();
};
