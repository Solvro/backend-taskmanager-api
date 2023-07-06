import { PROJECT_PATH } from "../../src/modules/project/project.controller";
import { correctProject, dropProjects, insertOne } from "../tests.utils/insert.project";
import { appMock } from "../mocks/app.mock";
import supertest from "supertest";
import { DEMO_USER_ID } from "../mocks/store.user.id.mock";
import { ErrorCodes } from "../../src/utils/error/error.codes";
import { ErrorDatas } from "../../src/utils/error/error.datas";

describe(`Testing GET ${PROJECT_PATH}/:projectId`, () => {
  beforeAll(() => {
    insertOne(correctProject);
  });

  afterAll(() => {
    dropProjects();
  });

  it("should return correct project when project with given id exists", async () => {
    const getProjectResponse = await supertest(appMock(DEMO_USER_ID))
      .get(`${PROJECT_PATH}/${correctProject._id}`)
      .send();

    expect(getProjectResponse.status).toBe(200);
    expect(getProjectResponse.body.projectCredentials).toStrictEqual(correctProject.projectCredentials);
  });

  it("should throw ResourceNotFoundError when project with given id does not exist", async () => {
    const getProjectResponse = await supertest(appMock(DEMO_USER_ID)).get(`${PROJECT_PATH}/WRONG_ID`).send();

    expect(getProjectResponse.status).toBe(404);
    expect(getProjectResponse.body.data).toStrictEqual(ErrorDatas.RESOURCE_NOT_FOUND);
    expect(getProjectResponse.body.code).toStrictEqual(ErrorCodes.RESOURCE_NOT_FOUND);
  });

  it("should throw ResourceNotFoundError when project with given id exists but the user is wrong", async () => {
    const getProjectResponse = await supertest(appMock("WRONG_USER_ID"))
      .get(`${PROJECT_PATH}/${correctProject._id}`)
      .send();

    expect(getProjectResponse.status).toBe(404);
    expect(getProjectResponse.body.data).toStrictEqual(ErrorDatas.RESOURCE_NOT_FOUND);
    expect(getProjectResponse.body.code).toStrictEqual(ErrorCodes.RESOURCE_NOT_FOUND);
  });
});
