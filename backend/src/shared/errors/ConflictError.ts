import { any } from "zod";
import { AppError } from "./AppError";

export class ConflictError extends AppError {
  constructor(message = "Conflito de Dados (duplicado)", details?: any) {
    super(message, 409, details);
  }
}
