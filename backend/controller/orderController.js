import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = "http://localhost:5173";

export const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    const line_items = req.body.items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 40 * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/payment?orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/cart`,
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Order failed" });
  }
};

export const verifyOrder = async (req, res) => {
  const { orderId } = req.body;

  await orderModel.findByIdAndUpdate(orderId, {
    payment: true,
    status: "Order Placed",
  });

  res.json({ success: true });
};

export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false });
  }
};

export const listOrders = async(req,res)=>{
  try {
    const orders = await orderModel.find({}) ;
    res.json({success:true , data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error listing order"})
  }
}
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Status update failed" });
  }
};

