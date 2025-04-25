import { Request, Response, NextFunction } from "express";
import { logger } from "../config/winston.config";

const HttpLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { method, url } = req;
    const status = res.statusCode;
    const ip = req.headers["x-fowarded-for"] || req.socket.remoteAddress;

    logger.http(
      `[${method}] ${url} - STATUS [${status}] - ${duration}ms - IP: ${ip}`
    );
  });

  next();
};

const ErrorLoggerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);
};

export const loggerMiddleware = [HttpLoggerMiddleware, ErrorLoggerMiddleware];
