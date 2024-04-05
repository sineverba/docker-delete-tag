import dotenvFlow from "dotenv-flow";
import { logger } from "./utils/utils.js";

const initializeApp = async () => {
  logger.info("App started!");
  dotenvFlow.config({ silent: true });
};

// Call initializeApp() and handle any initialization errors.
initializeApp().catch((error) => {
  logger.error("An error occurred during initialization:", error);
  process.exit(1);
});
