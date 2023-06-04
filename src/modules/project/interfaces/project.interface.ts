import { Specialization } from "../../../utils/specializations";

export interface Project {
  id: string;
  projectCredentials: ProjectCredentials;
}

export interface ProjectCredentials {
  name: string;
  users: ProjectUser[];
}

export interface ProjectUser {
  id: string;
  name:string
  specialization: Specialization;
}
