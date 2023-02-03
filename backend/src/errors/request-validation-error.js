import { CustomError } from "./custom-error.js";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  errors;
  constructor(errors) {
    super("Invalid request parameters");
    this.errors = errors;

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
