import { Router } from "express";
import { Controller } from "src/context/controller";
import * as swaggerUi from "swagger-ui-express";
import fs from "fs";

export const SWAGGER_PATH = "/api-docs";
const DOCS_JSON_PATH = "dist/docs/api.client.json";

const loadDocumentation = (path: string) => {
  fs.readFileSync(path);
};
const documentation = loadDocumentation(DOCS_JSON_PATH);

export class SwaggerController implements Controller {
  router = Router();

  constructor() {
    this.router.use(swaggerUi.serveFiles(documentation), swaggerUi.setup(documentation, { swaggerUrl: SWAGGER_PATH }));
  }
}
