import { Task } from "../../modules/task/interfaces/task";

export const sortTasksViaEstimation = (estimationToDuration: {
  [estimation: string]: number
}) => (taskA: Task, taskB: Task) =>
  estimationToDuration[taskA.credentials.estimation] - estimationToDuration[taskB.credentials.estimation];
