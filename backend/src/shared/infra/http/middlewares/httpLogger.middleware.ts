import { Request, Response, NextFunction } from "express";
import logger from "../../../config/winston.config";
import { asyncLocalStorage } from "../../../utils/asyncContext";

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
    const store = asyncLocalStorage.getStore();
    const correlationId = store?.correlationId ?? "unknown";

    logger.http("HTTP Access Log", {
      correlationId,
      method,
      url,
      statusCode: status,
      responseTime: `${duration}ms`,
      ip,
    });
  });

  next();
};
