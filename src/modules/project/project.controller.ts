import { Request, Response, Router } from "express";
import { Body, Get, OperationId, Post, Route, Security } from "tsoa";
import { ProjectService } from "./project.service";
import { projectCredentialsSchema } from "./validators/project.validator";
import { validate } from "../../utils/credentials.validator";
import { HTTP_CODE } from "../../utils/http.codes";
import { Project, ProjectCredentials } from "./interfaces/project.interface";
import { Controller } from "../../context/controller";

export const PROJECT_PATH = "/project";

@Route(`/project`)
export class ProjectController implements Controller {
  router = Router();

  constructor(private projectService: ProjectService) {
    this.router.post(PROJECT_PATH,
      validate(projectCredentialsSchema),
      (req: Request, res: Response) =>
        this.addProjectCredentials(req.body).then(() => res.sendStatus(HTTP_CODE.CREATED)));

    this.router.get(`${PROJECT_PATH}/user`,
      (req: Request, res: Response) =>
        this.getUserProjects().then((projects: Project[]) => res.json(projects))
    );

    this.router.get(`${PROJECT_PATH}/:projectId`,
      (req: Request, res: Response) =>
        this.getProject(req.params.projectId).then((project: Project) => res.json(project))
    );
  }

  /**
   * Add project with given credentials.
   * Example body
   * {
   *         "name": "Orzeł 1",
   *         "users": [{"name":"Leroy Jenkins", "specialization":"FRONTEND"}]
   * }
   */
  @OperationId("addProject")
  @Security("apiKey")
  @Post("/")
  addProjectCredentials(@Body() projectCredentials: ProjectCredentials): Promise<void> {
    return this.projectService.addProject(projectCredentials);
  }

  /**
   * Get projects attached to provided userId.
   */
  @OperationId("getUserProjects")
  @Security("apiKey")
  @Get("/user")
  getUserProjects(): Promise<Project[]> {
    return this.projectService.getUserProjects();
  }

  /**
   * Get project only if it belongs to user.
   */
  @OperationId("getProject")
  @Security("apiKey")
  @Get("/:projectId")
  getProject(projectId: string): Promise<Project> {
    return this.projectService.getProject(projectId);
  }
}
