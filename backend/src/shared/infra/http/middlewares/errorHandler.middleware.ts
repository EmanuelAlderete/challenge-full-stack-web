// src/shared/infra/http/middlewares/errorHandler.middleware.ts
import { Request, Response, NextFunction } from "express";
import { Prisma } from "../../../../../prisma/generated/prisma-client-js";
import logger from "../../../config/winston.config";
import { asyncLocalStorage } from "../../../utils/asyncContext";
import { AppError } from "../../../errors/AppError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const store = asyncLocalStorage.getStore();
  const correlationId = store?.correlationId ?? "unknown";

  let statusCode = 500;
  let message = "Erro inesperado.";
  let errorName = err.name;
  let errorDetails: any = {};

  // Prisma - Known Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = "Registro duplicado. Um campo único já está sendo usado.";
        errorDetails = { target: err.meta?.target };
        break;

      case "P2025":
        statusCode = 404;
        message = "Recurso não encontrado.";
        errorDetails = { cause: err.meta?.cause };
        break;

      case "P2003":
        statusCode = 400;
        message = "Relação inválida. Verifique os dados enviados.";
        errorDetails = { field: err.meta?.field_name };
        break;

      default:
        statusCode = 400;
        message = "Erro de requisição ao banco de dados.";
        errorDetails = { code: err.code, meta: err.meta };
        break;
    }
  }

  // Prisma - validation
  else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Erro de validação nos dados enviados.";
    errorDetails = { error: err.message };
  }

  // Prisma inicialization errors
  else if (
    err instanceof Prisma.PrismaClientInitializationError ||
    err instanceof Prisma.PrismaClientRustPanicError
  ) {
    statusCode = 500;
    message = "Erro interno ao acessar o banco de dados.";
  }

  // AppError
  else if (err instanceof AppError) {
    statusCode = err.status;
    message = err.message;
    errorDetails = err.details;
  }

  logger.error(
    `${correlationId} - [${req.method}] ${req.originalUrl} - ${message}`,
    {
      stack: err.stack,
      details: errorDetails,
    }
  );

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: errorName,
    ...(process.env.NODE_ENV !== "production" && { details: errorDetails }),
    correlationId,
  });
}
