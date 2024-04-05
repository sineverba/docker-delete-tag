import { HttpResponse, http } from "msw";

export const handlers = [
  http.get(
    "https://hub.docker.com/v2/repositories/:docker-login/:docker-image/tags",
    () => HttpResponse.json(),
  ),
];
