import { NextFunction, Response } from "express";
import { AuthRequest } from "../auth/auth.request.interface";
import { internalLocalStorage } from "../config/local.storage.config";
import { Resource, ResourceNotFoundError } from "../utils/error/error.module";

export const storeUserId = (req: AuthRequest, _: Response, next: NextFunction) => {
  const userId: string | undefined = req.get("user-id");
  if (!userId) throw new ResourceNotFoundError(Resource.USER_ID);
  internalLocalStorage.storeUserId(userId);
  next();
};
