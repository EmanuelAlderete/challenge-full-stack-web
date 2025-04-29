import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(message = "Recurso não encontrado", details?: any) {
    super(message, 404, details);
  }
}
