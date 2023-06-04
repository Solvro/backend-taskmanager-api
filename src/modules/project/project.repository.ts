import { Project } from "./interfaces/project.interface";
import { Mongo } from "../../db/mongo";

export class ProjectRepository {
  insertOne = async (project: Project): Promise<void> => {
    await Mongo.projects().insertOne(project);
  };
}
