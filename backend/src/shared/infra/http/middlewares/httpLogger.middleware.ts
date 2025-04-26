import { Request, Response, NextFunction } from "express";
import { logger } from "../config/winston.config";

export const HttpLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { method, url } = req;
    const status = res.statusCode;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    logger.http("HTTP Access Log", {
      method,
      url,
      statusCode: status,
      responseTime: `${duration}ms`,
      ip,
    });
  });

  next();
};
