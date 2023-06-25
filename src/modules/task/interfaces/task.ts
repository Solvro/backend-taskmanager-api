import { Estimation } from "./estimation";
import { DateRange } from "../../../utils/date.range";
import { TaskState } from "./task.state";
import { Specialization } from "../../../utils/specializations";

export interface Task {
  _id: string;
  projectId: string;
  credentials: TaskCredentials;
  state: TaskState;
  createdAt: number,
  createdBy: {
    userId: string
  },
  dateRange?: DateRange;
}

export interface TaskCredentials {
  name: string;
  assignedTo?: {
    userId: string
  };
  estimation: Estimation;
  specialization: Specialization;
}
