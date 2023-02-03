import { Router } from "express";
import { currentUser, requireAuth } from "../../middlewares/index.js";
import { Order } from "../../models/index.js";

export const getAllOrderRouter = Router();

getAllOrderRouter.get(
  "/order_items",
  currentUser,
  requireAuth,
  async (req, res) => {
    let offset =
      parseInt(req.query.offset) > 0 ? parseInt(req.query.offset) : 1;

    let limit =
      parseInt(req.query.limit) >= 20 && parseInt(req.query.limit) <= 100
        ? parseInt(req.query.limit)
        : 20;

    let sortBy =
      req.query.sortBy && req.query.sortBy.toLowerCase() == "price"
        ? { price: 1 }
        : { shipping_limit_date: 1 };

    let skip = limit * (offset - 1);

    let total = await Order.find({
      seller_id: req.currentUser.username,
    }).count();

    const cursor = Order.aggregate([
      { $match: { seller_id: req.currentUser.username } },
      { $skip: skip },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "product_id",
          as: "fromItems",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$fromItems", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $replaceWith: {
          $setField: {
            field: "id",
            input: "$$ROOT",
            value: "$order_id",
          },
        },
      },
      {
        $replaceWith: {
          $setField: {
            field: "product_category",
            input: "$$ROOT",
            value: "$product_category_name",
          },
        },
      },
      {
        $replaceWith: {
          $setField: {
            field: "date",
            input: "$$ROOT",
            value: "$shipping_limit_date",
          },
        },
      },
      {
        $unset: [
          "order_id",
          "order_item_id",
          "_id",
          "product_name_lenght",
          "product_description_lenght",
          "product_photos_qty",
          "product_weight_g",
          "product_length_cm",
          "product_height_cm",
          "product_width_cm",
          "product_limit_date",
          "product_category_name",
          "freight_value",
          "seller_id",
          "shipping_limit_date",
        ],
      },
      { $project: { fromItems: 0 } },
    ])
      .limit(limit)
      .sort(sortBy);

    const order = await cursor.toArray();

    await cursor.close();

    res.send({
      data: order,
      total,
      limit,
      offset,
    });
  }
);
