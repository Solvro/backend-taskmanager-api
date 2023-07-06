import { Project, ProjectCredentials, ProjectUser } from "../../src/modules/project/interfaces/project.interface";
import { DEMO_USER_ID } from "../mocks/store.user.id.mock";
import { Specialization } from "../../src/utils/specializations";
import { projects } from "../mocks/repositories/project.repository.mock";

export const projectIds = {
  id1: "ID1",
};

export const projectNames = {
  name1: "Project name 1",
};

export const userIds = {
  id1: "USER_ID1",
};

export const userNames = {
  name1: "Jakub",
};

export const correctProjectUser1: ProjectUser = {
  id: userIds.id1,
  name: userNames.name1,
  specialization: Specialization.BACKEND,
};

export const correctProjectCredentials: ProjectCredentials = {
  name: projectNames.name1,
  users: [correctProjectUser1],
};

export const correctProject: Project = {
  _id: projectIds.id1,
  userId: DEMO_USER_ID,
  projectCredentials: correctProjectCredentials,
};

export const insertOne = (project: Project) => {
  projects.push(project);
};

export const dropProjects = () => {
  projects.length = 0;
};
