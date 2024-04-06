import { HttpResponse, http } from "msw";
import login from "../__mocks__/responses/login.json";

export const handlers = [
  http.post("https://hub.docker.com/v2/users/login/", () =>
    HttpResponse.json(login),
  ),
];
