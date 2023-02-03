import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import bodyParser from "body-parser";

import { NotFoundError } from "./errors/index.js";
import { errorHandler } from "./middlewares/index.js";
import {
  signInRouter,
  signOutRouter,
  updateAccountRouter,
} from "./routes/auth/index.js";
import {
  deleteOrderByIdRouter,
  getAllOrderRouter,
} from "./routes/orders/index.js";

const app = express();
app.set("trust proxy", true);

app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use([
  // Account
  signInRouter,
  updateAccountRouter,
  signOutRouter,

  // Orders
  getAllOrderRouter,
  deleteOrderByIdRouter,
]);

app.get("/", (req, res) => {
  res.send({ message: "Working fine🚀" });
});

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
