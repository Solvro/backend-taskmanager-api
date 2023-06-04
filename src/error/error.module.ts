import { ErrorCodes } from "./error.codes";
import { Resource } from "./error.datas";
import {HTTP_CODE} from "../utils/http.codes";

export interface AppError {
  status: number,
  code: string,
  data: string | ValidationErrorData
}

interface ValidationErrorData {
  info: string,
  invalidProperties?: string[],
  userInputValue?: string
}

export class ValidationErrors implements AppError {
  status = HTTP_CODE.UNPROCESSABLE_ENTITY;
  code = ErrorCodes.VALIDATOR_ERROR;
  data;

  constructor(
    private userInputValue?: string,
    private validationErrors?: string[],
    invalidProperties?: (string | undefined)[] | string) {
    this.data = {
      info: `User input is not assignable to required type`,
      userInputValue,
      invalidProperties
    };
  }
}

export class ResourceNotFoundError implements AppError {
  status = HTTP_CODE.NOT_FOUND;
  code = ErrorCodes.RESOURCE_NOT_FOUND;
  data;

  constructor(resource?: Resource) {
    this.data = `Resource ${resource} wasn't found for given credentials`;
  }
}


