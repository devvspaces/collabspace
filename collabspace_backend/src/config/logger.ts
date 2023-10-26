import winston from "winston";

// Logger can be used using logger.log(), logger.debug() etc
const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

export default logger;
