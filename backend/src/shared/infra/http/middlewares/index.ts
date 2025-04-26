import { ErrorLoggerMiddleware } from "./errorLogger.middleware";
import { HttpLoggerMiddleware } from "./httpLogger.middleware";

const loggerMiddlewares = [ErrorLoggerMiddleware, HttpLoggerMiddleware];

export default loggerMiddlewares;
