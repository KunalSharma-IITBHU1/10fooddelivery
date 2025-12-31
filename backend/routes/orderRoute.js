import express from "express";
import auth from "../middleware/auth.js";
import { placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus } from "../controller/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", auth, placeOrder);
orderRouter.post("/verify", auth, verifyOrder);
orderRouter.get("/user-orders", auth, userOrders);
orderRouter.get("/list" ,listOrders)
orderRouter.post("/status", updateOrderStatus)

export default orderRouter;
