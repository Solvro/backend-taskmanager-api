import { Body, OperationId, Path, Post, Route, Security } from "tsoa";
import { Request, Response, Router } from "express";
import { TaskService } from "./task.service";
import { Task, TaskCredentials } from "./interfaces/task";
import { Controller } from "../../context/controller";
import { PROJECT_PATH } from "../project/project.controller";
import { validate } from "../../utils/credentials.validator";
import { taskCredentialsSchema, taskEditCredentialsSchema } from "./validators/task.validator";
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

    this.router.put(`${PROJECT_PATH}/:projectId${TASK_PATH}/:taskId`,
      validate(taskEditCredentialsSchema),
      (req: Request, res: Response) =>
        this.editProjectTask({ projectId: req.params.projectId, ...req.body }, req.params.taskId)
          .then((task: Task) => res.json(task))
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

  /**
   * Edit task credentials.
   * None property is required.
   * Date range properties must be valid Epoch Unix Timestamp.
   * Important! If your body contains "dateRange" property You have to specify start and end time.
   * Filed "projectId" is not editable.
   * Example body
   * {
   *   "name": "Budowa Orła 2",
   *   "assignedTo": {
   *     "userId": "1337"
   *   },
   *   "estimation": "THREE",
   *   "specialization": "BACKEND",
   *   "dateRange": {
   *     "start": "2137",
   *     "end": "4200"
   *   }
   * }
   */
  @OperationId("editProjectTask")
  @Security("apiKey")
  @Post("/:taskId")
  editProjectTask(@Body() taskCredentials: TaskCredentials, @Path() taskId: string): Promise<Task> {
    return this.taskService.editTask(taskCredentials, taskId);
  }
}
