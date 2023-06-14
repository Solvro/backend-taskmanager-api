import crypto from "crypto";

export const hash = (valueToHash: string): string => {
  const salt = "salt";
  const iterations = 10000;
  const hashBytes = 64;
  const digest = "sha512";
  return crypto.pbkdf2Sync(valueToHash, salt, iterations, hashBytes, digest).toString("hex");
};
