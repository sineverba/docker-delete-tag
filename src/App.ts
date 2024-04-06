interface Token {
  token: string;
  refresh_token: string;
}

export default class App {
  private baseUrl: string = "https://hub.docker.com/v2/";

  private getHeaders = (): Headers => {
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return headers;
  };

  public getBaseUrl = (): string => this.baseUrl;

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
}
