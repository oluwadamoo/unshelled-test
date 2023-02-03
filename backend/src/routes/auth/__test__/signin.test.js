import request from "supertest";
import { app } from "../../../app";

it("fails when invalid credentials are supplied", async () => {
  return request(app)
    .post("/account/signin")
    .send({
      username: "",
      password: "",
    })
    .expect(400);
});

it("returns with a cookie when given valid credentials", async () => {
  const response = await request(app)
    .post("/account/signin")
    .send({
      username: "e49c26c3edfa46d227d5121a6b6e4d37",
      password: "55325",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
