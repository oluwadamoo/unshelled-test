import { Router } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";

import { BadRequestError } from "../../errors/bad-request-error.js";
import { validateRequest } from "../../middlewares/index.js";
import { Seller } from "../../models/index.js";

export const signInRouter = Router();

signInRouter.post(
  "/account/signin",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Please enter your username"),
    body("password")
      .trim()
      .isNumeric()
      .notEmpty()
      .withMessage("Please enter your password"),
  ],
  validateRequest,
  async (req, res) => {
    const { username, password } = req.body;

    const seller = await Seller.findOne({
      seller_id: username,
    });

    if (!seller) {
      throw new BadRequestError("Invalid Credentials");
    }

    if (seller.seller_zip_code_prefix !== parseInt(password)) {
      throw new BadRequestError("Invalid Credentials");
    }

    const userJwt = jwt.sign(
      { id: seller._id, username: seller.seller_id },
      process.env.JWT_KEY
    );

    req.session = {
      jwt: userJwt,
    };

    res.send({ seller, message: "Signin successful!" });
  }
);
