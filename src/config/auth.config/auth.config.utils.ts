import crypto from "crypto";
import { appConfig } from "../config";

export const hash = (
  value: string,
  salt = appConfig.HASH_SALT,
  iterations = 10000,
  hashBytes = 64,
  digest = "sha512"
): string => crypto.pbkdf2Sync(value, salt, iterations, hashBytes, digest).toString("hex");
