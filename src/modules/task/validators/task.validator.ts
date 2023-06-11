import * as yup from "yup";
import { Specialization } from "../../../utils/specializations";
import { Estimation } from "../interfaces/estimation";

export const taskCredentialsSchema = yup.object().shape({
  name: yup.string().required("Task name is required"),
  assignedTo: yup.object().shape({
    userId: yup.string().required("You must assign task to user"),
  }),
  specialization: yup.string().oneOf(Object.values(Specialization), "Invalid specialization").required("Specialization is required"),
  estimation: yup.string().oneOf(Object.values(Estimation), "Invalid estimation").required("Estimation is required")
});
