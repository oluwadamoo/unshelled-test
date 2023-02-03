import { Router } from "express";
import { NotAuthorizedError } from "../../errors/not-authorized-error.js";
import { NotFoundError } from "../../errors/not-found-error.js";
import { currentUser, requireAuth } from "../../middlewares/index.js";
import { Order } from "../../models/index.js";

export const deleteOrderByIdRouter = Router();

deleteOrderByIdRouter.delete(
  "/order_items/:id",
  currentUser,
  requireAuth,
  async (req, res) => {
    const order = await Order.findOne({
      order_id: req.params.id,
    });

    if (!order) {
      throw new NotFoundError("Order not found!");
    }

    if (order.seller_id !== req.currentUser.username) {
      throw new NotAuthorizedError();
    }

    await Order.deleteOne({ order_id: req.params.id });

    res.status(204).send({});
  }
);
