import { config } from "dotenv";

import { app } from "./app.js";
import { run } from "./models/db-connection.js";

config();

const start = async () => {
  console.log("starting up...🚶");

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (process.env.NODE_ENV == "development" && !process.env.PORT) {
    throw new Error("PORT must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  await run(process.env.MONGO_URI).catch(console.dir);

  app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
  });
};

start();
