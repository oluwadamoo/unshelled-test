import { CustomError } from "./custom-error.js";

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  message = "Not authorized";
  constructor(message) {
    super("Not authorized");

    if (message) {
      this.message = message;
    }
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
