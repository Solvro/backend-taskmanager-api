import * as yup from "yup";
import { TaskState } from "../interfaces/task.state";

const stateTransitions = {
  [TaskState.NOT_ASSIGNED]: [TaskState.IN_PROGRESS, TaskState.DELETED],
  [TaskState.IN_PROGRESS]: Object.values(TaskState),
  [TaskState.CLOSED]: [],
  [TaskState.DELETED]: []
};

export const taskEditStateSchema = (getCurrentTaskState: () => Promise<TaskState | undefined>) => yup.object().shape({
  state: yup.string().oneOf(Object.values(TaskState), "Invalid state").required()
    .test("This state cannot by set from current state", async function(this: yup.TestContext, value: any) {
      const currentState: TaskState | undefined = await getCurrentTaskState();
      if (!currentState)
        return false;

      const allowedStates: TaskState[] = stateTransitions[currentState];

      return allowedStates.includes(value as TaskState);
    })
});

