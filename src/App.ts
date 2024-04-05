export default class App {
  private baseUrl: string = "https://hub.docker.com/v2/repositories/";

  public getBaseUrl = (): string => this.baseUrl;
}
