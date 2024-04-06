import dotenvFlow from "dotenv-flow";
import { logger } from "./utils/utils.js";
import App from "./App.js";

const initializeApp = async () => {
  dotenvFlow.config({ silent: true });
  logger.info("App started!");
  if (!process.env.DOCKER_USERNAME || !process.env.DOCKER_PASSWORD) {
    logger.error("Cannot find username or password. Exit from app");
    process.exit(1);
  }
  const app = new App();
  const data = await app.login(
    process.env.DOCKER_USERNAME,
    process.env.DOCKER_PASSWORD,
  );
  if (!data || !data.token) {
    logger.error("Cannot authenticate. Exit from app");
    process.exit(1);
  }
  logger.info("Work completed. Exit from app");
};

// Call initializeApp() and handle any initialization errors.
initializeApp().catch((error) => {
  logger.error("An error occurred during initialization:", error);
  process.exit(1);
});
