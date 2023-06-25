import { AssignmentRepositoryPort } from "./ports/assignment.repository.port";
import { Assignment } from "./interfaces/assignment";
import { Mongo } from "../../utils/db/mongo";

export class AssignmentRepository implements AssignmentRepositoryPort {
  insertOne = async (assigment: Assignment): Promise<void> => {
    await Mongo.assignments().insertOne(assigment);
  };
}
