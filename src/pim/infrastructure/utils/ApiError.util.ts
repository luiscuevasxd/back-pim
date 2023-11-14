export class ApiError extends Error {
  public errorCode: string;
  public errorDetails?: unknown;
  public statusCode = 500;

  constructor(message: string, errorCode: string, statusCode = 500, errorDetails?: unknown) {
    super(message);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    if (errorDetails) {
      this.errorDetails = errorDetails;
    }
  }
}
