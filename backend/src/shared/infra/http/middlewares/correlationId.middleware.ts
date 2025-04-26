import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { asyncLocalStorage } from "../../../utils/asyncContext";

export const correlationIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const correlationId = uuidv4();

  asyncLocalStorage.run({ correlationId }, () => {
    (req as any).correlationId = correlationId;
    next();
  });
};
