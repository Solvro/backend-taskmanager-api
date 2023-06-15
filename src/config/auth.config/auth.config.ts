import { AuthData } from "../../auth/auth.request.interface";
import { Mongo } from "../../utils/db/mongo";
import { appConfig } from "../config";
import { Resource, ResourceNotFoundError } from "../../utils/error/error.module";
import { hash } from "./auth.config.utils";

let USERS_AUTH_CREDENTIALS;

const getMostRecentData = () => Mongo.authData().findOne({}, { sort: { createdAt: -1 } });

export const provideAuthData = async (): Promise<AuthData | null> => {
  await Mongo.connect(appConfig.MONGO_AUTH_SERVER_URL);
  return getMostRecentData();
};

export const fetchUsersLoginCredentials = async (provideAuthData: () => Promise<AuthData | null>): Promise<void> => {
  const authData: AuthData | null = await provideAuthData();
  if (!authData) throw new ResourceNotFoundError(Resource.AUTH_DATA);

  const usersCredentials = authData.usersCredentials;

  for (const [key, value] of Object.entries(usersCredentials)) usersCredentials[key] = hash(value);

  USERS_AUTH_CREDENTIALS = authData;
};

export { USERS_AUTH_CREDENTIALS };
