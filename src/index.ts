import dotenvFlow from "dotenv-flow";
import { checkValidToken, logger } from "./utils/utils.js";
import DockerHub from "./DockerHub.js";

/**
 * Initializes the application by loading environment variables, logging the start of the app, and performing necessary checks.
 * If required environment variables are missing or authentication fails, the app exits with an error.
 */
const initializeApp = async (): Promise<void> => {
  dotenvFlow.config({ silent: true });

  // Log app start
  logger.info("App started!");

  // Check for required environment variables
  if (!checkValidToken()) {
    logger.error(
      "Cannot find username, password or a Gitlab token. Exiting from the app",
    );
    process.exit(1);
  }
  if (!process.env.ORGANIZATION && !process.env.GITLAB_TOKEN) {
    logger.error("Missing organization and Gitlab Token. Exiting from the app");
    process.exit(1);
  }
  if (!process.env.IMAGE || !process.env.TAG) {
    logger.error("Some required fields are missing. Exiting from the app");
    process.exit(1);
  }

  // Docker Hub section
  if (
    process.env.DOCKER_USERNAME &&
    process.env.DOCKER_PASSWORD &&
    process.env.ORGANIZATION
  ) {
    // Create an instance of the DockerHub class
    logger.info("Detected settings for Docker Hub.");
    const app = new DockerHub();

    // Attempt to authenticate
    const data = await app.login(
      process.env.DOCKER_USERNAME,
      process.env.DOCKER_PASSWORD,
    );

    // If authentication fails, exit the app
    if (!data || !data.token) {
      logger.error("Cannot authenticate. Exiting from the app");
      process.exit(1);
    }

    // If authentication succeeds, proceed to delete the tag
    const { token } = data;
    app.deleteTag(
      token,
      process.env.ORGANIZATION,
      process.env.IMAGE,
      process.env.TAG,
    );
  }

  if (process.env.GITLAB_TOKEN && !process.env.DOCKER_USERNAME) {
    logger.info("Detected settings for Gitlab Registry");
    logger.info("! WORK IN PROGRESS ! ");
    logger.info("! NOTHING DONE ! ");
  }

  // Log completion and exit the app
  logger.info("Work completed. Exiting from the app");
};

// Call initializeApp() and handle any initialization errors.
initializeApp().catch((error) => {
  logger.error("An error occurred during initialization:", error);
  process.exit(1);
});
