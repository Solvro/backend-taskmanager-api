import { Body, Get, OperationId, Path, Post, Put, Route, Security } from "tsoa";
import { NextFunction, Request, Response, Router } from "express";
import { TaskService } from "./task.service";
import { Task, TaskCredentials } from "./interfaces/task";
import { Controller } from "../../context/controller";
import { PROJECT_PATH } from "../project/project.controller";
import { validate } from "../../utils/credentials.validator";
import { taskCredentialsSchema, taskEditCredentialsSchema } from "./validators/task.validator";
import { HTTP_CODE } from "../../utils/http.codes";
import { taskEditStateSchema } from "./validators/task.state.validator";
import { TaskControllerPort } from "./ports/task.controller.port";
import { TaskState } from "./interfaces/task.state";
import { internalLocalStorage } from "../../config/local.storage.config";


export const TASK_PATH = "/task";

@Route(`/project/:projectId/task`)
export class TaskController implements Controller {
  router = Router();

  constructor(private taskService: TaskService, private taskControllerAdapter: TaskControllerPort) {
    this.router.post(`${PROJECT_PATH}/:projectId${TASK_PATH}`,
      validate(taskCredentialsSchema),
      (req: Request, res: Response) =>
        this.addProjectTask(req.body, req.params.projectId)
          .then((taskId: string) => res.status(HTTP_CODE.CREATED).json(taskId))
    );

    this.router.get(`${PROJECT_PATH}/:projectId${TASK_PATH}`,
      (req: Request, res: Response) =>
        this.getProjectTasks(req.params.projectId)
          .then((tasks: Task[]) => res.json(tasks))
    );

    this.router.get(`${PROJECT_PATH}/:projectId${TASK_PATH}/:taskId`,
      (req: Request, res: Response) =>
        this.getTask(req.params.taskId, req.params.projectId).then((task: Task) => res.json(task))
    );

    this.router.put(`${PROJECT_PATH}/:projectId${TASK_PATH}/:taskId`,
      validate(taskEditCredentialsSchema),
      (req: Request, res: Response) =>
        this.editProjectTask(req.body, req.params.taskId, req.params.projectId)
          .then((task: Task) => res.json(task))
    );

    this.router.put(`${PROJECT_PATH}/:projectId${TASK_PATH}/:taskId/state`,
      (req: Request, res: Response, next: NextFunction) =>
        validate(taskEditStateSchema(
          () => taskControllerAdapter.getCurrentTaskState(
            req.params.taskId,
            req.params.projectId,
            internalLocalStorage.getUserId()
          )))
        (req, res, next),
      (req: Request, res: Response) =>
        this.editTaskState(req.body.state, req.params.taskId, req.params.projectId)
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
  addProjectTask(@Body() taskCredentials: TaskCredentials, @Path() projectId: string): Promise<string> {
    return this.taskService.addTask(taskCredentials, projectId);
  }

  /**
   * Get every task assigned to given project.
   */
  @OperationId("getProjectTasks")
  @Security("apiKey")
  @Get("/")
  getProjectTasks(@Path() projectId: string): Promise<Task[]> {
    return this.taskService.getProjectTasks(projectId);
  }

  /**
   * Get every task credentials.
   */
  @OperationId("getTask")
  @Security("apiKey")
  @Get("/:taskId")
  getTask(@Path() taskId: string, @Path() projectId: string): Promise<Task> {
    return this.taskService.getTask(taskId, projectId);
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
  @Put("/:taskId")
  editProjectTask(@Body() taskCredentials: TaskCredentials, @Path() taskId: string, @Path() projectId: string): Promise<Task> {
    return this.taskService.editTask(taskCredentials, taskId, projectId); //TODO block editing deleted task
  }

  /**
   * Edit task state.
   * Possible state transitions:
   *  {
   *   [TaskState.NOT_ASSIGNED]: [TaskState.IN_PROGRESS, TaskState.DELETED],
   *   [TaskState.IN_PROGRESS]: Object.values(TaskState),
   *   [TaskState.CLOSED]: [],
   *   [TaskState.DELETED]: []
   * };
   *
   * Example body
   * {
   *   "state": "CLOSED"
   * }
   */
  @OperationId("editTaskState")
  @Security("apiKey")
  @Put("/:taskId/state")
  editTaskState(@Body() taskState: TaskState, @Path() taskId, @Path() projectId): Promise<Task> {
    return this.taskService.editTaskState(taskState, taskId, projectId);
  }
}
