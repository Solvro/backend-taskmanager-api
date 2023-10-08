import { Project, ProjectCredentials, ProjectUser } from "../../src/modules/project/interfaces/project.interface";
import { Specialization } from "../../src/utils/specializations";
import { TEST_USER_ID } from "../mocks/test.credentials";

export const projectIds = {
  id1: "ID1",
  invalidId: "InvalidId",
};

export const userIds = {
  id1: "USER_ID1",
};

export const validProjectUser1: ProjectUser = {
  id: userIds.id1,
  name: "Jakub",
  specialization: Specialization.BACKEND,
};

export const validProjectCredentials: ProjectCredentials = {
  name: "Project name 1",
  users: [validProjectUser1],
};

export const validProject: Project = {
  _id: projectIds.id1,
  userId: TEST_USER_ID,
  projectCredentials: validProjectCredentials,
};
