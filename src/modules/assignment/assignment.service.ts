import { AssignmentServicePort } from "./ports/assignment.service.port";
import { AssignmentRepositoryPort } from "./ports/assignment.repository.port";
import { Assignment } from "./interfaces/assignment";
import { internalLocalStorage } from "../../config/local.storage.config";
import { Task } from "../task/interfaces/task";
import { v4 as uuid } from "uuid";
import { AssignmentState } from "./interfaces/assignment.state";
import { ProjectUser } from "../project/interfaces/project.interface";

export class AssignmentService {

  constructor(
    private assignmentServiceAdapter: AssignmentServicePort,
    private assignmentRepositoryAdapter: AssignmentRepositoryPort) {
  }

  createAssignment = async (projectId: string): Promise<Assignment> => {
    const userId: string = internalLocalStorage.getUserId(); //TODO what if doesnt own project?

    const tasksToAssign: Task[] =
      await this.assignmentServiceAdapter.getNotAssignedTasks(projectId, userId);

    const closedTasks: Task[] =
      await this.assignmentServiceAdapter.getClosedTasks(projectId, userId);

    const estimationToDuration: { [estimation: string]: number } =
      this.assignmentServiceAdapter.findDurationForEstimation(closedTasks);

    const projectUsers: ProjectUser[] = await this.assignmentServiceAdapter.findProjectUsers(projectId);

    const assignedTasks: { [taskId: string]: { userId: string } } =
      this.assignmentServiceAdapter.assignTasks(tasksToAssign, estimationToDuration, projectUsers);

    const generateAssigment = (): Assignment => ({
      _id: uuid(),
      createdBy: {
        userId
      },
      createdAt: Date.now(),
      state: AssignmentState.PROPOSED,
      assign: assignedTasks
    }); //TODO cache this value, 10 minutes, REDIS!!!

    const assigment: Assignment = generateAssigment();

    await this.assignmentRepositoryAdapter.insertOne(assigment);

    return assigment;
  };
}

