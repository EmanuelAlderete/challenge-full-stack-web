import { createLogger, format, transports, loggers, http } from "winston";
import path from "path";

export const logger = createLogger({
  level: "http",
  format: format.combine(
    format.timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
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
