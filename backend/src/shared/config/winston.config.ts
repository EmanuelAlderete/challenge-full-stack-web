import { createLogger, format, transports, loggers, http } from "winston";
import path from "path";
import { getContext } from "../utils/asyncContext";

const logger = createLogger({
  level: process.env.LOG_LEVEL || "http",
  format: format.combine(
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.printf((info) => {
      const context = getContext();
      const correlationId = context?.correlationId || "N/A";

      return `${info.timestamp} <span class="math-inline">\{info\.level\} \[</span>{correlationId}] ${info.message}`;
    }),
    format.json()
  ),
  defaultMeta: { service: "BACKEND - NODE" },
  transports: [
    new transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
    }),
    new transports.File({
      filename: path.join("logs", "http.log"),
      level: "http",
    }),
    new transports.File({
      filename: path.join("logs", "warn.log"),
      level: "warn",
    }),
    new transports.File({
      filename: path.join("logs", "info.log"),
      level: "info",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;
