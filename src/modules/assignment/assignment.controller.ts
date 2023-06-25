import { OperationId, Path, Post, Route, Security } from "tsoa";
import { Controller } from "../../context/controller";
import { Request, Response, Router } from "express";
import { AssignmentService } from "./assignment.service";
import { Assignment } from "./interfaces/assignment";
import { PROJECT_PATH } from "../project/project.controller";

export const ASSIGNMENT_PATH = "/assignment";

@Route(`/project/:projectId/assignment`)
export class AssignmentController implements Controller {
  router = Router();

  constructor(private assigmentService: AssignmentService) {
    this.router.post(`${PROJECT_PATH}/:projectId${ASSIGNMENT_PATH}`,
      (req: Request, res: Response) =>
        this.generateAssigment(req.params.projectId)
          .then((assigment: Assignment) => res.json(assigment))
    );
  }

  /**
   * Generate assigment for given project.
   * Algorithm will assign tasks to all project users with matching
   * specialization in way to finish project as soon as possible
   * Example body
   * {
   * }
   */
  @OperationId("generateAssigment")
  @Security("apiKey")
  @Post("/")
  generateAssigment(@Path() projectId: string): Promise<Assignment> {
    return this.assigmentService.createAssignment(projectId);
  }

}
