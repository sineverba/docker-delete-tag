import { describe, expect, it, vi } from "vitest";
import { filterProject } from "../../utils/utils";
import projects from "../__mocks__/responses/projects.json";

describe("Test external utils", () => {
  it("Can filter the project and returns the ID", () => {
    const expectedResult = "12345678";
    expect(filterProject(projects)).toBe(expectedResult);
  });

  it("Can return null if project not found", () => {
    vi.stubEnv("PROJECT", "foo");
    expect(filterProject(projects)).toBe(null);
  });
});
