import { AuthRequest } from "./auth.request.interface";
import { NextFunction, Response } from "express";
import { Forbidden, Resource, ResourceNotFoundError } from "../utils/error/error.module";
import { USERS_AUTH_CREDENTIALS } from "../config/auth.config/auth.config";
import { hash } from "../config/auth.config/auth.config.utils";

export const getSecretKeyValue = (userId: string): string => {
  const { usersCredentials } = USERS_AUTH_CREDENTIALS;
  return usersCredentials[userId];
};

export const auth = (req: AuthRequest, _: Response, next: NextFunction): void => {
  const userId: string | undefined = req.get("user-id");
  if (!userId) throw new ResourceNotFoundError(Resource.USER_ID);

  const userSecretKey: string | undefined = req.get("secret-key");
  if (!userSecretKey) throw new ResourceNotFoundError(Resource.USER_SECRET_KEY);

  const hashedUserSecretKey: string = hash(userSecretKey);
  const secretKey: string = getSecretKeyValue(userId);
  if (hashedUserSecretKey !== secretKey) throw new Forbidden();

  next();
};
