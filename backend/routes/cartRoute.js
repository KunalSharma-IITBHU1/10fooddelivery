import express from "express";
import auth from "../middleware/auth.js";
import { addToCart, removeFromCart, getCart } from "../controller/cartController.js";

const cartRouter = express.Router();

cartRouter.post("/add", auth, addToCart);
cartRouter.post("/remove", auth, removeFromCart);
cartRouter.get("/get", auth, getCart);

export default cartRouter;
