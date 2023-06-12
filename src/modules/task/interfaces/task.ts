import { Estimation } from "./estimation";
import { DateRange } from "../../../utils/date.range";
import { TaskState } from "./task.state";
import { Specialization } from "../../../utils/specializations";

export interface Task {
  id: string;
  credentials: TaskCredentials;
  state: TaskState;
  createdAt: number,
  createdBy: {
    userId: string
  }
}

export interface TaskCredentials {
  name: string;
  projectId: string;
  assignedTo?: {
    userId: string
  };
  estimation: Estimation;
  dateRange?: DateRange;
  specialization: Specialization;
}


