import { getMockProjectController } from "./project.context.mock";
import { Controller } from "../../../src/context/controller";
import "express-async-errors";

export const mockControllers = [getMockProjectController()].map((c: Controller) => c.router);
