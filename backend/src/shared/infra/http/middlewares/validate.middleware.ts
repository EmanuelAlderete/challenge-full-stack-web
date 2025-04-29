import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import logger from "../../../config/winston.config";
import { ValidationError } from "../../../errors/ValidationError";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(
        "Erro de validação nos dados enviados.",
        result.error.format()
      );
    }
    req.body = result.data;
    next();
  };
