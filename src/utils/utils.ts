/**
 * File to collect some utilities
 */
import winston from "winston";
import dotenvFlow from "dotenv-flow";

// Start env file
dotenvFlow.config({ silent: true });

/**
 * Calculates the log level based on the environment variable or defaults to "debug".
 * @returns The log level as a string.
 */
const getLogLevel = (): string => {
  /**
   * If the environment variable LOG_LEVEL is not set or is an empty string,
   * default to "debug".
   */
  if (!process.env.LOG_LEVEL || process.env.LOG_LEVEL === "") {
    return "debug";
  }
  /**
   * Otherwise, return the log level specified in the environment variable.
   */
  return process.env.LOG_LEVEL;
};

/**
 * Formats log messages for Winston.
 * @param logMessage The log message object containing information such as timestamp, level, and message.
 * @returns The formatted log message string.
 */
const formatLogMessage = (
  logMessage: winston.Logform.TransformableInfo,
): string =>
  `${logMessage.timestamp} - ${logMessage.level.toUpperCase()} - ${logMessage.message}`;

/**
 * Create a logger instance to be used throughout the project.
 */
const logger: winston.Logger = winston.createLogger({
  /**
   * Specifies the minimum level of messages to log.
   */
  level: "info",

  /**
   * Specifies the format of the log messages.
   */
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    /**
     * The log message format template.
     * @param {Object} log The log message object.
     * @param {string} log.message The log message.
     * @param {string} log.level The log level (e.g., 'info', 'error').
     * @param {string} log.service The name of the service.
     * @param {string} log.timestamp The timestamp of the log message.
     * @returns {string} The formatted log message.
     */
    winston.format.printf(formatLogMessage),
  ),

  /**
   * Specifies the default metadata to be included with log messages.
   */
  defaultMeta: { service: "docker-delete-tag" },

  /**
   * Specifies the transports (outputs) where log messages should be sent.
   */
  transports: [
    new winston.transports.Stream({
      /**
       * The output stream where log messages are written.
       */
      stream: process.stderr,

      /**
       * Specifies the minimum level of messages to log for this transport.
       */
      level: getLogLevel(),

      /**
       * Specifies whether this transport should be silent (i.e., not produce any output).
       */
      silent: process.env.NODE_ENV === "test",
    }),
  ],
});

/**
 * Checks the validity of tokens based on the following rules:
 *
 * - If both DOCKER_USERNAME and DOCKER_PASSWORD are defined and non-empty, returns true.
 * - If both DOCKER_USERNAME, DOCKER_PASSWORD, and GITLAB_TOKEN are defined and non-empty, returns true.
 * - If GITLAB_TOKEN is defined and non-empty, returns true.
 * - If DOCKER_USERNAME is defined but DOCKER_PASSWORD is not, or vice versa, returns false.
 *
 * @returns A boolean indicating whether the tokens are valid.
 *
 * @example
 *
 * // Returns true if both DOCKER_USERNAME and DOCKER_PASSWORD are defined and non-empty,
 * // or if GITLAB_TOKEN is defined and non-empty.
 * checkValidToken();
 *
 * process.env.DOCKER_USERNAME = 'username';
 * process.env.DOCKER_PASSWORD = 'password';
 * process.env.GITLAB_TOKEN = 'gitlab_token';
 *
 * // Returns true since all tokens are defined and non-empty.
 * checkValidToken();
 *
 * process.env.DOCKER_PASSWORD = ''; // Emptying DOCKER_PASSWORD
 *
 * // Returns false since DOCKER_PASSWORD is now empty.
 * checkValidToken();
 *
 * delete process.env.DOCKER_USERNAME; // Removing DOCKER_USERNAME
 *
 * // Returns true since GITLAB_TOKEN is still defined and non-empty.
 * checkValidToken();
 */
const checkValidToken = (): boolean => {
  return (
    !!(
      process.env.DOCKER_USERNAME &&
      process.env.DOCKER_PASSWORD &&
      process.env.DOCKER_USERNAME.trim() !== "" &&
      process.env.DOCKER_PASSWORD.trim() !== ""
    ) || !!process.env.GITLAB_TOKEN
  );
};

/**
 * Filters an array of projects based on the provided criteria and returns the ID of the first matching project.
 *
 * @param projects An array containing project objects.
 * @returns The ID of the first project matching the criteria, converted to a string, or null if no matching project is found.
 *
 * @example
 *
 * const projects = [
 *   { id: 1, path: 'project1' },
 *   { id: 2, path: 'project2' },
 *   { id: 3, path: 'project3' }
 * ];
 *
 * process.env.PROJECT = 'project2';
 *
 * // Returns '2' since it finds the project with path 'project2' and returns its ID as a string.
 * filterProject(projects);
 *
 * process.env.PROJECT = 'project4';
 *
 * // Returns null since there's no project with path 'project4'.
 * filterProject(projects);
 */
const filterProject = (projects: any): string | null =>
  projects
    .filter((project: any) => project.path === process.env.PROJECT)[0]
    ?.id.toString() || null;

export {
  getLogLevel,
  formatLogMessage,
  logger,
  checkValidToken,
  filterProject,
};
