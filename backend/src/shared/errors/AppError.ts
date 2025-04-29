export class AppError extends Error {
  public readonly status: number;
  public readonly details?: any;

  constructor(message: string, status = 500, details?: any) {
    super(message);
    this.name = new.target.name;
    this.status = status;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
