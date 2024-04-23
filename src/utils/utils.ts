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

export { getLogLevel, formatLogMessage, logger };
