import dotenvFlow from "dotenv-flow";
import { logger } from "./utils/utils.js";
import App from "./App.js";

/**
 * Initializes the application by loading environment variables, logging the start of the app, and performing necessary checks.
 * If required environment variables are missing or authentication fails, the app exits with an error.
 */
const initializeApp = async (): Promise<void> => {
  dotenvFlow.config({ silent: true });

  // Log app start
  logger.info("App started!");

  // Check for required environment variables
  if (!process.env.DOCKER_USERNAME || !process.env.DOCKER_PASSWORD) {
    logger.error("Cannot find username or password. Exiting from the app");
    process.exit(1);
  }
  if (!process.env.ORGANIZATION || !process.env.IMAGE || !process.env.TAG) {
    logger.error("Some required fields are missing. Exiting from the app");
    process.exit(1);
  }

  // Create an instance of the App class
  const app = new App();

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

  // Log completion and exit the app
  logger.info("Work completed. Exiting from the app");
};

// Call initializeApp() and handle any initialization errors.
initializeApp().catch((error) => {
  logger.error("An error occurred during initialization:", error);
  process.exit(1);
});
