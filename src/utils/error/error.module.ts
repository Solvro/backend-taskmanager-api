import { ErrorCodes } from "./error.codes";
import { ErrorDatas } from "./error.datas";
import { HTTP_CODE } from "../http.codes";

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
  data = ErrorDatas.RESOURCE_NOT_FOUND;
  resource;

  constructor(resource: Resource) {
    this.resource = resource;
  }
}


export class InternalServerError implements AppError {
  status = HTTP_CODE.INTERNAL_SERVER_ERROR;
  code = ErrorCodes.INTERNAL_SERVER_ERROR;
  data = ErrorDatas.INTERNAL_SERVER_ERROR;
}

export enum Resource {
  PROJECT = "PROJECT",
  TASK = "TASK"
}

