import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { asyncLocalStorage } from "../../../utils/asyncContext";

export const CorrelationIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correlationId = uuidv4();

  asyncLocalStorage.run({ correlationId }, () => {
    next();
  });
};
