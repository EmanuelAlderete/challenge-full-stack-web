import { createLogger, format, transports } from "winston";
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
    format((info, opts) => {
      const context = getContext();
      const correlationId = context?.correlationId || "N/A";
      info.correlationId = correlationId;
      return info;
    })(),
    format.json()
  ),
  defaultMeta: { service: "BACKEND - NODE" },
  transports: [
    new transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.File({
      filename: path.join("logs", "http.log"),
      level: "http",
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  const consoleFormat = format.combine(
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    format.printf((info) => {
      const context = getContext();
      const correlationId = context?.correlationId || "N/A";
      const message = info.stack
        ? `${info.message}\n${info.stack}`
        : info.message;
      return `${
        info.timestamp
      } [${info.level.toLocaleUpperCase()}] [${correlationId}] ${message}`;
    }),
    format.colorize({ all: true })
  );

  logger.add(
    new transports.Console({
      format: consoleFormat,
      level: process.env.LOG_LEVEL || "http",
    })
  );
}

export default logger;
