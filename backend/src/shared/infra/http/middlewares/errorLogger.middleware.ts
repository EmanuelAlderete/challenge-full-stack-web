import { Request, Response, NextFunction } from "express";
import { logger } from "../config/winston.config";

export const ErrorLoggerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message, { stack: err.stack });
  next();
};
