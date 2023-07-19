import { PROJECT_PATH } from "../../src/modules/project/project.controller";
import { projectIds, validProject } from "../tests.utils/insert.project";
import { appMock } from "../mocks/app.mock";
import supertest from "supertest";
import { ErrorCodes } from "../../src/utils/error/error.codes";
import { ErrorDatas } from "../../src/utils/error/error.datas";
import { getMockProjectController } from "../mocks/context/project.context.mock";
import { SECRET_KEY_HEADER, TEST_SECRET_KEY, TEST_USER_ID, USER_ID_HEADER } from "../mocks/test.credentials";
import { HTTP_CODE } from "../../src/utils/http.codes";
import { MockProjectRepository } from "../mocks/repositories/project.repository.mock";

describe(`Testing GET ${PROJECT_PATH}/:projectId`, () => {
  it("should return valid project when project with given id exists", async () => {
    const mockProjectRepository = new MockProjectRepository();
    mockProjectRepository.getOneByProjectAndUserId = jest.fn(() => Promise.resolve(validProject));

    const { status, body } = await supertest(appMock([getMockProjectController(mockProjectRepository)]))
      .get(`${PROJECT_PATH}/${validProject._id}`)
      .set(USER_ID_HEADER, TEST_USER_ID)
      .set(SECRET_KEY_HEADER, TEST_SECRET_KEY)
      .send();

    expect(status).toBe(HTTP_CODE.SUCCESS);
    expect(body.projectCredentials).toStrictEqual(validProject.projectCredentials);
  });

  it("should throw ResourceNotFoundError when project with given id does not exist", async () => {
    const mockProjectRepository = new MockProjectRepository();
    mockProjectRepository.getOneByProjectAndUserId = jest.fn(() => Promise.resolve(null));

    const { status, body } = await supertest(appMock([getMockProjectController(mockProjectRepository)]))
      .get(`${PROJECT_PATH}/${projectIds.invalidId}`)
      .set(USER_ID_HEADER, TEST_USER_ID)
      .set(SECRET_KEY_HEADER, TEST_SECRET_KEY)
      .send();

    expect(status).toBe(HTTP_CODE.NOT_FOUND);
    expect(body.data).toBe(ErrorDatas.RESOURCE_NOT_FOUND);
    expect(body.code).toBe(ErrorCodes.RESOURCE_NOT_FOUND);
  });
});
