import { NextFunction, Response } from "express";
import { AuthRequest } from "../auth/auth.request.interface";
import { internalLocalStorage } from "../config/local.storage.config";

export const storeUserId = (req: AuthRequest, _: Response, next: NextFunction) => {
  //internalLocalStorage.storeUserId(req.user.id);
  internalLocalStorage.storeUserId("DUMMY_USER"); //TODO fix this
  next();
};
