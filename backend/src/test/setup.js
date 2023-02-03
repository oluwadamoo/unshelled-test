import { config } from "dotenv";
import { run } from "../models";
import request from "supertest";
import { app } from "../app";

config();

// var client;
beforeAll(async () => {
  process.env.JWT_KEY = "werss";

  await run(process.env.MONGO_URI).catch(console.dir);
});
global.signin = async () => {
  const response = await request(app)
    .post("/account/signin")
    .send({
      username: "e49c26c3edfa46d227d5121a6b6e4d37",
      password: "55325",
    })
    .expect(200);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
