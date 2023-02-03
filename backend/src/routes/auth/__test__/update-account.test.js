import request from "supertest";
import { app } from "../../../app";

it("updates the logged in user's city", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .patch("/account")
    .set("Cookie", cookie)
    .send({
      seller_city: "Bariga",
      seller_state: "Lagos",
    })
    .expect(200);

  expect(response.body.seller.seller_state).toEqual("Lagos");
  expect(response.body.seller.seller_city).toEqual("Bariga");
});
