export class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly token: string;

  constructor(message: string, statusCode = 400, token = null) {
    this.message = message;
    this.statusCode = statusCode;
    this.token = token;
  }
}
