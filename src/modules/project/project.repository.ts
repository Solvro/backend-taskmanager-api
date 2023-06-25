import { Project } from "./interfaces/project.interface";
import { Mongo } from "../../utils/db/mongo";
import { ProjectRepositoryPort } from "./ports/project.repository.port";

export class ProjectRepository implements ProjectRepositoryPort {
  insertOne = async (project: Project): Promise<void> => {
    await Mongo.projects().insertOne(project);
  };

  getOneByProjectId = (projectId: string): Promise<Project | null> =>
    Mongo.projects().findOne({ _id: projectId });

  getManyByUserId = (userId: string): Promise<Project[]> =>
    Mongo.projects().find({ userId }).toArray();

  getOneByProjectAndUserId = (projectId: string, userId: string): Promise<Project | null> =>
    Mongo.projects().findOne({ _id: projectId, userId });
}
