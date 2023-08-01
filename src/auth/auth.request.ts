import { AuthRequest } from "./auth.request.interface";
import { NextFunction, Response } from "express";
import { Forbidden, Resource, ResourceNotFoundError } from "../utils/error/error.module";
import { hash } from "../config/auth.config/auth.config.utils";

export const auth = (getSecretKeyValue) => (req: AuthRequest, _: Response, next: NextFunction) => {
  const userId: string | undefined = req.get("user-id");
  if (!userId) throw new ResourceNotFoundError(Resource.USER_ID);

  const userSecretKey: string | undefined = req.get("secret-key");
  if (!userSecretKey) throw new ResourceNotFoundError(Resource.SECRET_KEY);

  const hashedUserSecretKey: string = hash(userSecretKey);
  const secretKey: string = getSecretKeyValue(userId);
  if (!secretKey) throw new ResourceNotFoundError(Resource.USER_SAVED_SECRET_KEY);

  if (hashedUserSecretKey !== secretKey) throw new Forbidden();

  next();
};
