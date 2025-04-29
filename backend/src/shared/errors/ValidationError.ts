import { AppError } from "./AppError";

export class ValidationError extends AppError {
  constructor(message = "Erro de validação", details?: any) {
    super(message, 400, details);
  }
}
