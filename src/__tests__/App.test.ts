import { describe, expect, it } from "vitest";
import App from "../App";

describe("Test App", () => {
  it("Can return base url", () => {
    const app = new App();
    expect(app.getBaseUrl()).toBe("https://hub.docker.com/v2/repositories/");
  });
});
