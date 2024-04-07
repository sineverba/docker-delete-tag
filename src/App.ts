/**
 * Represents an authentication token object returned by the Docker API.
 */
interface Token {
  token: string;
  refresh_token: string;
}

/**
 * Represents the main application class responsible for interacting with the Docker Hub API.
 */
export default class App {
  private baseUrl: string = "https://hub.docker.com/v2/";

  /**
   * Returns the base URL of the Docker Hub API.
   * @returns The base URL of the Docker Hub API.
   */
  public getBaseUrl = (): string => this.baseUrl;

  /**
   * Performs user authentication against the Docker Hub API using the provided credentials.
   * @param username - The Docker username.
   * @param password - The Docker password.
   * @returns A promise that resolves with the authentication token upon successful authentication.
   */
  login = (username: string, password: string): Promise<void | Token> => {
    const request: RequestInfo = new Request(
      `${this.getBaseUrl()}users/login/`,
      {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify({ username, password }),
      },
    );
    return fetch(request)
      .then((res) => res.json())
      .then((res) => res as Token);
  };

  /**
   * Deletes a specified tag of a Docker image from the Docker Hub API.
   * @param token - The authentication token.
   * @param organization - The Docker organization to which the image belongs.
   * @param image - The name of the Docker image.
   * @param tag - The tag of the Docker image to be deleted.
   * @returns A promise that resolves upon successful deletion.
   */
  deleteTag = (
    token: string,
    organization: string,
    image: string,
    tag: string,
  ): Promise<void | string> => {
    const request: RequestInfo = new Request(
      `${this.getBaseUrl()}repositories/${organization}/${image}/tags/${tag}`,
      {
        method: "DELETE",
        headers: this.getHeaders(token),
      },
    );
    return fetch(request).then(() => "");
  };

  /**
   * Retrieves the headers for API requests, including the authentication token if provided.
   * @param token - The authentication token (optional).
   * @returns The headers for API requests.
   */
  private getHeaders = (token?: string): Headers => {
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    if (token) {
      headers.set("Authorization", `JWT ${token}`);
    }
    return headers;
  };
}
