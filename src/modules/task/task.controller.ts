import { Body, OperationId, Post, Route, Security } from "tsoa";
import { Request, Response, Router } from "express";
import { TaskService } from "./task.service";
import { TaskCredentials } from "./interfaces/task";
import { Controller } from "../../context/controller";
import { PROJECT_PATH } from "../project/project.controller";
import { validate } from "../../utils/credentials.validator";
import { taskCredentialsSchema } from "./validators/task.validator";
import { HTTP_CODE } from "../../utils/http.codes";


export const TASK_PATH = "/task";

@Route(`/project/:projectId/task`)
export class TaskController implements Controller {
  router = Router();

  constructor(private taskService: TaskService) {
    this.router.post(`${PROJECT_PATH}/:projectId${TASK_PATH}`,
      validate(taskCredentialsSchema),
      (req: Request, res: Response) =>
        this.addProjectTask({ projectId: req.params.projectId, ...req.body })
          .then(() => res.sendStatus(HTTP_CODE.CREATED))
    );
  }

  /**
   * Add task for given project.
   * Example body
   * {
   *   "name": "Budowa Orła 1",
   *   "assignedTo": {
   *     "userId": "420"
   *   },
   *   "estimation": "ONE",
   *   "specialization": "FRONTEND"
   * }
   */
  @OperationId("addProjectTask")
  @Security("apiKey")
  @Post("/")
  addProjectTask(@Body() taskCredentials: TaskCredentials): Promise<void> {
    return this.taskService.addTask(taskCredentials);
  }
}
