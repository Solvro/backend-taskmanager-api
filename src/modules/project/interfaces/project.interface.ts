import { Specialization } from "../../../utils/specializations";

export interface Project {
  _id: string;
  userId: string;
  projectCredentials: ProjectCredentials;
}

export interface ProjectCredentials {
  name: string;
  users: ProjectUser[];
}

export interface ProjectUser {
  id: string;
  name: string;
  specialization: Specialization;
}
