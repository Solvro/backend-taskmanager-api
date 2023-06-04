import { Request, Response, Router } from "express";
import { Controller } from "src/context/controller";
import { OperationId, Get, Route } from "tsoa";

export const HEALTH_PATH = "/health";

@Route(`/health`)
export class HealthController implements Controller {
  router = Router();

  constructor() {
    this.router.get("/", this.health);
  }

  /**
   * check if server is up and running
   * @param req
   * @param res
   */
  @OperationId("healthCheck")
  @Get("/health")
  health = (req: Request, res: Response) => res.json({ status: "Server up and running" });
}
