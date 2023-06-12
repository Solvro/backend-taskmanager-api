import * as yup from "yup";
import { Specialization } from "../../../utils/specializations";
import { Estimation } from "../interfaces/estimation";

const nameSchema = yup.string().required("Task name is required");
const specializationSchema = yup.string().oneOf(Object.values(Specialization), "Invalid specialization").required("Specialization is required");
const estimationSchema = yup.string().oneOf(Object.values(Estimation), "Invalid estimation").required("Estimation is required");
const assignedToSchema = yup.object().shape({
  userId: yup.string().required("You must assign task to user")
});
const dateRangeSchema = yup.object().shape({
  start: yup.number().notRequired(),
  end: yup.number().notRequired()
}).test("Date range is incorrect", function(value) {
  if (!value || !value.start || !value.end)
    return true;

  return value.start <= value.end;
});

export const taskCredentialsSchema = yup.object().shape({
  name: nameSchema,
  specialization: specializationSchema,
  estimation: estimationSchema
});

export const taskEditCredentialsSchema = yup.object().shape({
  name: nameSchema.notRequired(),
  assignedTo: assignedToSchema.notRequired(),
  specialization: specializationSchema.notRequired(),
  estimation: estimationSchema.notRequired(),
  dateRange: dateRangeSchema
});
