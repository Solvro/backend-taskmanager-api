import { AssignmentState } from "./assignment.state";

export interface Assignment {
  _id: string;
  createdBy: {
    userId: string;
  };
  createdAt: number;
  state: AssignmentState;
  assign: { [taskId: string]: { userId: string } };
}
