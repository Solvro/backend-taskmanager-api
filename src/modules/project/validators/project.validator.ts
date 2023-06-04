import * as yup from "yup";
import { Specialization } from "../../../utils/specializations";

const projectUserSchema = yup.object().shape({
  name: yup.string().required("User name is required"),
  specialization: yup.string().oneOf(Object.values(Specialization), "Invalid specialization").required("Specialization is required")
});

export const projectCredentialsSchema = yup.object().shape({
  name: yup.string().required("Project name is required"),
  users: yup.array().of(projectUserSchema).min(1, "You need to add at least one user")
});
