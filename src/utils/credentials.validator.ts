import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { ValidationErrors } from "./error/error.module";

const UNRECOGNIZED_ERROR = "Unrecognized validation error";
// eslint-disable-next-line
export const validate = (schema: yup.ObjectSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction) =>
    schema.validate(req.body, { abortEarly: false })
      .then(() => next()).catch((error: yup.ValidationError) => {
      throw new ValidationErrors(
        error.value,
        error.errors,
        error.inner ? error.inner.map(r => r.type ? `${r.path}-${r.errors}`:r.path) : UNRECOGNIZED_ERROR
      );
    });
};
