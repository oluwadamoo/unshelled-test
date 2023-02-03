import request from "supertest";
import { app } from "../../../app";

it("deletes an order item by id", async () => {
  const cookie = await global.signin();
  const order_items = await request(app)
    .get("/order_items")
    .set("Cookie", cookie)
    .expect(200);

  let item_to_be_del = order_items.body.data[0];
  let total = parseInt(order_items.body.total);
  await request(app)
    .delete("/order_items/" + item_to_be_del.product_id)
    .set("Cookie", cookie)
    .expect(204);

  const order_items_after_del = await request(app)
    .get("/order_items")
    .set("Cookie", cookie)
    .expect(200);

  expect(parseInt(order_items_after_del.body.total)).toEqual(total - 1);
});
