import { Router } from "express";
import * as swaggerUi from "swagger-ui-express";
import fs from "fs";
import { Controller } from "../context/controller";

export const SWAGGER_PATH = "/docs";
const DOCS_JSON_PATH = "dist/docs/api.client.json";
const loadDocumentation = (path: string) => {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
};
const documentation = loadDocumentation(DOCS_JSON_PATH);

export class SwaggerController implements Controller {
  router = Router();

  constructor() {
    this.router.use(swaggerUi.serveFiles(documentation), swaggerUi.setup(documentation, { swaggerUrl: SWAGGER_PATH }));
  }
}
