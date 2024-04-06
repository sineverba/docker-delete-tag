import { describe, expect, it } from "vitest";
import App from "../App";
import login from "../__tests__/__mocks__/responses/login.json";

describe("Test App", () => {
  it("Can return base url", () => {
    const app = new App();
    expect(app.getBaseUrl()).toBe("https://hub.docker.com/v2/");
  });

  it("Can return token on successful login", async () => {
    const app = new App();
    const result = await app.login(
      process.env.DOCKER_USERNAME as string,
      process.env.DOCKER_PASSWORD as string,
    );
    expect(result).toStrictEqual(login);
  });
});
