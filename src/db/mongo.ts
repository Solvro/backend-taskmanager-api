import { Db, MongoClient } from "mongodb";
const LOG = "Log"

export class Mongo {
  private static mongo: Db;
  private static client: MongoClient;

  public static connect = (url: string): Promise<Db> =>
    MongoClient.connect(url, { ignoreUndefined: true })
      .then((c) => (Mongo.client = c))
      .then((c) => (Mongo.mongo = c.db()))
      .then((db) => db);

  public static close = () => Mongo.client.close();

  //@ts-ignore
  private static mongoCollection = <T>(name: string) => Mongo.mongo.collection<T>(name);
}
