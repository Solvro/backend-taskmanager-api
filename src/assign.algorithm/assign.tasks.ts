import { Task } from "../modules/task/interfaces/task";
import { ProjectUser } from "../modules/project/interfaces/project.interface";
import { Specialization } from "../utils/specializations";

export const assignTasks = (
  tasksToAssign: Task[],
  estimationToDuration: { [estimation: string]: number },
  users: ProjectUser[],
  sortUsers: (users: ProjectUser[]) => ProjectUser[],
  sortTasks: (estimationToDuration: { [estimation: string]: number }) => (taskA: Task, TaskB: Task) => number
): { [taskId: string]: { userId: string } } => {
  const divideAndSortUsersBySpecialization = (users: ProjectUser[]):
    { [specialization: string]: ProjectUser[] } => {
    let usersBySpecialization = {};

    for (let specialization of Object.values(Specialization)) {
      const usersWithSpecialization: ProjectUser[] =
        users.filter(u => u.specialization === specialization);

      usersBySpecialization[specialization] = sortUsers(usersWithSpecialization);
    }

    return usersBySpecialization;
  };

  const usersBySpecialization = divideAndSortUsersBySpecialization(users);

  let assignedTasks = {};

  tasksToAssign.sort(sortTasks(estimationToDuration));

  for (let task of tasksToAssign) {
    const availableUsers: ProjectUser[] = usersBySpecialization[task.credentials.specialization];
    const user: ProjectUser | undefined = availableUsers.pop();
    if (!user)
      throw new Error("There is no users for this specialization");

    assignedTasks[task._id] = { userId: user.id };
    availableUsers.push(user);
  }

  return assignedTasks;
};

