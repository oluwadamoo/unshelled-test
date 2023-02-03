import { Router } from "express";

export const signOutRouter = Router();

signOutRouter.post("/account/signout", (req, res) => {
  req.session = null;

  res.send({});
});
