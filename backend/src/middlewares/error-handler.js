import { CustomError } from "../errors/index.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.log(err);

  res.status(500).send({
    errors: [{ message: "Something went wrong" }],
  });
};
