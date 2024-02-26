import express from "express";
import { Order } from "../models/order.model.js";
import { Cart } from "../model/cart.model.js";

const router = express.Router();

// GET all orders
router.get("/getAllOrders", async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Order.find().populate('orderitems');

    // Respond with the fetched orders
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET order by ID
router.get("/getOrder/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Fetch the order by ID from the database
    const order = await Order.findById(orderId).populate('orderitems');

    // Check if the order with the given ID exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Respond with the fetched order
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// create a order
router.post("/createOrder", async (req, res) => {
    try {
      const { orderitems, address } = req.body;
  
      // Check if the cart with the given ID exists
      const cart = await Cart.findById(orderitems);
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      // Create a new order using the Order model
      const newOrder = new Order({
        orderitems: orderitems,
        address: address,
      });
  
      // Save the order to the database
      const savedOrder = await newOrder.save();
  
      // Respond with the saved order
      res.status(201).json(savedOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
export default router;
