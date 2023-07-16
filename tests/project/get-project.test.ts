import { PROJECT_PATH } from "../../src/modules/project/project.controller";
import { correctProject } from "../tests.utils/insert.project";
import { appMock, TEST_USER_ID } from "../mocks/app.mock";
import supertest from "supertest";
import { ErrorCodes } from "../../src/utils/error/error.codes";
import { ErrorDatas } from "../../src/utils/error/error.datas";
import { getMockProjectController } from "../mocks/context/project.context.mock";
import { SECRET_KEY_HEADER, TEST_SECRET_KEY, USER_ID_HEADER } from "../mocks/constants.mock";

describe(`Testing GET ${PROJECT_PATH}/:projectId`, () => {
  it("should return correct project when project with given id exists", async () => {
    const { status, body } = await supertest(appMock([getMockProjectController()]))
      .get(`${PROJECT_PATH}/${correctProject._id}`)
      .set(USER_ID_HEADER, TEST_USER_ID)
      .set(SECRET_KEY_HEADER, TEST_SECRET_KEY)
      .send();

    expect(status).toBe(200);
    expect(body.projectCredentials).toStrictEqual(correctProject.projectCredentials);
  });

  it("should throw ResourceNotFoundError when project with given id does not exist", async () => {
    const invalidProjectId = "InvalidId";
    const resourceNotFoundStatusCode = 404;

    const { status, body } = await supertest(appMock([getMockProjectController()]))
      .get(`${PROJECT_PATH}/${invalidProjectId}`)
      .set(USER_ID_HEADER, TEST_USER_ID)
      .set(SECRET_KEY_HEADER, TEST_SECRET_KEY)
      .send();

    expect(status).toBe(resourceNotFoundStatusCode);
    expect(body.data).toBe(ErrorDatas.RESOURCE_NOT_FOUND);
    expect(body.code).toBe(ErrorCodes.RESOURCE_NOT_FOUND);
  });
});
