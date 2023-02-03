import { Router } from "express";
import { body } from "express-validator";

import {
  currentUser,
  requireAuth,
  validateRequest,
} from "../../middlewares/index.js";
import { Seller } from "../../models/index.js";

export const updateAccountRouter = Router();

updateAccountRouter.patch(
  "/account",
  currentUser,
  requireAuth,
  [body("seller_city").trim().notEmpty().withMessage("Please enter your city")],
  validateRequest,
  async (req, res) => {
    const { seller_city, seller_state } = req.body;

    let seller = await Seller.findOne({ seller_id: req.currentUser.username });

    await Seller.updateOne(
      { seller_id: req.currentUser.username },
      {
        $set: {
          seller_city,
          seller_state: seller_state ? seller_state : seller.seller_state,
        },
      }
    );

    seller = await Seller.findOne({ seller_id: req.currentUser.username });

    res.send({ message: "Account updated", seller });
  }
);
