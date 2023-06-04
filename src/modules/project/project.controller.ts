import { Request, Response, Router } from "express";
import { Body, OperationId, Post, Route, Security } from "tsoa";
import { ProjectService } from "./project.service";
import { projectCredentialsSchema } from "./validators/project.validator";
import { validate } from "../../utils/credentials.validator";
import { HTTP_CODE } from "../../utils/http.codes";
import { ProjectCredentials } from "./interfaces/project.interface";
import { Controller } from "../../context/controller";

export const PROJECT_PATH = "/project";

@Route(`/project`)
export class ProjectController implements Controller {
  router = Router();

  constructor(private projectService: ProjectService) {

    this.router.post(PROJECT_PATH,
      validate(projectCredentialsSchema),
      (req: Request, res: Response) =>
        this.addPatientCredentials(req.body).then(() => res.sendStatus(HTTP_CODE.CREATED)));
  }

  @OperationId("addProject")
  @Security("none", ["user"])
  @Post("/")
  addPatientCredentials(@Body() projectCredentials: ProjectCredentials): Promise<void> {
    return this.projectService.addProject(projectCredentials);
  }
}
