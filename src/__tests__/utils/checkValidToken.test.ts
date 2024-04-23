import { describe, expect, it, vi } from "vitest";
import { checkValidToken } from "../../utils/utils";

describe("Test external utils", () => {
  it("Can return true if both DOCKER_USERNAME and DOCKER_PASSWORD are stored, with no GITLAB_TOKEN", () => {
    expect(checkValidToken()).toBe(true);
  });

  it("Can return true if both DOCKER_USERNAME and DOCKER_PASSWORD and GITLAB_TOKEN are stored", () => {
    expect(checkValidToken()).toBe(true);
  });

  it("Can return true if only GITLAB_TOKEN is stored", () => {
    expect(checkValidToken()).toBe(true);
  });

  it("Can return false if only DOCKER_USERNAME is stored (no DOCKER_PASSWORD or GITLAB_TOKEN)", () => {
    vi.stubEnv("DOCKER_PASSWORD", "");
    vi.stubEnv("GITLAB_TOKEN", "");
    expect(checkValidToken()).toBe(false);
  });

  it("Can return false if only DOCKER_PASSWORD is stored (no DOCKER_PASSWORD or GITLAB_TOKEN)", () => {
    vi.stubEnv("DOCKER_USERNAME", "");
    vi.stubEnv("GITLAB_TOKEN", "");
    expect(checkValidToken()).toBe(false);
  });
});
