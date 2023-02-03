import request from "supertest";
import { app } from "../../../app";

it("retrieves the logged in seller's order items", async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get("/order_items")
    .set("Cookie", cookie)
    .expect(200);
});
