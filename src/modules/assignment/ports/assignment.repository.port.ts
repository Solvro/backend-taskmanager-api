import { Assignment } from "../interfaces/assignment";

export interface AssignmentRepositoryPort {
  insertOne: (assigment: Assignment) => Promise<void>;
}
