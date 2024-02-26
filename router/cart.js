import express from "express";
import jwt from "jsonwebtoken";
import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";
import { OrderItem } from "../model/orderItem.model.js";
import cookieParser from "cookie-parser";

const router = express.Router();


// Middleware to verify user authentication
const verifyToken = (req, res, next) => {
    const token = req.cookie.token;
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Missing token" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.jwtsecret);
      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  };
// to get all product in cart
// http://localhost:8000/cart/getCart
router.get("/getCart", verifyToken, async (req, res) => {
    try {
      const userId = req.userId;
      const cart = await Cart.find({});
      res.status(200).json(cart);
   

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

// Middleware to check if the order item schema is empty
const checkEmptyOrderItemSchema = async (userId, productId, quantity) => {
  try {
    const existingOrderItem = await OrderItem.findOne({ userId });

    if (!existingOrderItem) {
      // If order item schema is empty, create a new order item
      const newOrderItem = new OrderItem({
        productId: productId,
        Quantity: quantity,
      });

      await newOrderItem.save();
    }
  } catch (error) {
    throw error;
  }
};
// create a new Cart
// http://localhost:8000/cart/createCart
router.post("/createCart", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const token = req.cookie.token;

    // Verify and decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.jwtsecret);
    const userId = decoded._id;

    // Check if the order item schema is empty and add a new order item if needed
    await checkEmptyOrderItemSchema(userId, productId, quantity);

    // Fetch the existing order item(s) from the database
    const existingOrderItems = await OrderItem.find({ userId });

    // Fetch all order items from the database
    const orderItemsWithPrices = await Promise.all(
      existingOrderItems.map(async (orderItem) => {
        const { productId, Quantity } = orderItem;

        // Fetch the product by ID to get its price
        const product = await Product.findById(productId);

        // Check if the product with the given ID exists
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        // Calculate the total price for the order item
        const totalPriceForItem = product.price * Quantity;

        return {
          productId,
          Quantity,
          totalPriceForItem,
        };
      })
    );

    // Calculate the total price for the entire cart
    const totalPriceForCart = orderItemsWithPrices.reduce(
      (total, orderItem) => total + orderItem.totalPriceForItem,
      0
    );

    // Create a new cart using the Cart model
    const newCart = await Cart.create({
      orderPrice: totalPriceForCart,
      customer: userId,
      ordersItems: orderItemsWithPrices,
    });

    // Save the cart to the database
    const savedCart = await newCart.save();

    // Respond with the saved cart
    res.status(201).json(savedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// update the cart
// to get all product in cart
// http://localhost:8000/cart/updateCart
router.put("/updateCart", verifyToken, async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.userId;
  
      // Fetch the existing order item for the specified product and user
      let existingOrderItem = await OrderItem.findOne({ userId, productId });
  
      if (!existingOrderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }
  
      // Update the quantity for the existing order item
      existingOrderItem.Quantity = quantity;
  
      // Save the updated order item
      await existingOrderItem.save();
  
      // Fetch all order items from the database
      const existingOrderItems = await OrderItem.find({ userId });
  
      // Calculate the total price for the entire cart
      const totalPriceForCart = existingOrderItems.reduce(
        (total, orderItem) => total + orderItem.totalPriceForItem,
        0
      );
  
      // Update the Cart model with the new details
      const updatedCart = await Cart.findOneAndUpdate(
        { customer: userId },
        { orderPrice: totalPriceForCart, ordersItems: existingOrderItems },
        { new: true }
      );
  
      if (!updatedCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Respond with the updated cart information
      res.status(200).json({
        orderItems: existingOrderItems,
        totalCartPrice: totalPriceForCart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


//remove the items in cart
// http://localhost:8000/cart/removeCartItem/:productId
router.delete("/removeCartItem/:productId", verifyToken, async (req, res) => {
    try {
      const productId = req.params.productId;
      const userId = req.userId;
  
      // Remove the order item for the specified product and user
      const removedOrderItem = await OrderItem.findOneAndRemove({
        userId,
        productId,
      });
  
      if (!removedOrderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }
  
      // Fetch all remaining order items from the database
      const remainingOrderItems = await OrderItem.find({ userId });
  
      // Calculate the total price for the entire cart
      const totalPriceForCart = remainingOrderItems.reduce(
        (total, orderItem) => total + orderItem.totalPriceForItem,
        0
      );
  
      // Update the Cart model with the new details
      const updatedCart = await Cart.findOneAndUpdate(
        { customer: userId },
        { orderPrice: totalPriceForCart, ordersItems: remainingOrderItems },
        { new: true }
      );
  
      if (!updatedCart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Respond with the updated cart information
      res.status(200).json({
        orderItems: remainingOrderItems,
        totalCartPrice: totalPriceForCart,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
export default router;
