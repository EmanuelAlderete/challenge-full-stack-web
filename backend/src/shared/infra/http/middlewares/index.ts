import { CorrelationIdMiddleware } from "./correlationId.middleware";
import { ErrorLoggerMiddleware } from "./errorLogger.middleware";
import { HttpLoggerMiddleware } from "./httpLogger.middleware";

const loggerMiddlewares = [
  CorrelationIdMiddleware,
  ErrorLoggerMiddleware,
  HttpLoggerMiddleware,
];

export default loggerMiddlewares;
