import { Db, MongoClient } from "mongodb";
import { Project } from "../../modules/project/interfaces/project.interface";
import { Task } from "../../modules/task/interfaces/task";

export class Mongo {
  private static mongo: Db;
  private static client: MongoClient;

  public static connect = (url: string): Promise<Db> =>
    MongoClient.connect(url, { ignoreUndefined: true })
      .then((c) => (Mongo.client = c))
      .then((c) => (Mongo.mongo = c.db()))
      .then((db) => db);

  public static close = () => Mongo.client.close();
  public static projects = () => Mongo.mongoCollection<Project>("projects");
  public static tasks = () => Mongo.mongoCollection<Task>("tasks")

  //@ts-ignore
  private static mongoCollection = <T>(name: string) => Mongo.mongo.collection<T>(name);
}
