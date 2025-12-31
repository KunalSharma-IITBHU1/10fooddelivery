import userModel from "../model/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    if (!itemId) {
      return res.json({ success: false, message: "ItemId missing" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    let cart = user.cartData || new Map();

    if (cart.has(itemId)) {
      cart.set(itemId, cart.get(itemId) + 1);
    } else {
      cart.set(itemId, 1);
    }

    user.cartData = cart;
    await user.save();

    res.json({
      success: true,
      cartData: Object.fromEntries(user.cartData),
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding to cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    if (!itemId) {
      return res.json({ success: false, message: "ItemId missing" });
    }

    const user = await userModel.findById(userId);

    if (!user || !user.cartData.has(itemId)) {
      return res.json({ success: false });
    }

    const qty = user.cartData.get(itemId);

    if (qty > 1) {
      user.cartData.set(itemId, qty - 1);
    } else {
      user.cartData.delete(itemId);
    }

    await user.save();

    res.json({
      success: true,
      cartData: Object.fromEntries(user.cartData),
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing from cart" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false });
    }

    res.json({
      success: true,
      cartData: Object.fromEntries(user.cartData || {}),
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};
