import { Assignment } from "../interfaces/assignment";

export interface AssignmentRepositoryPort {
  insertOne: (assignment: Assignment) => Promise<void>;

  findOne: (projectId: string, assignmentId: string) => Promise<Assignment | null>;
}
