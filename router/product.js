import express from "express";
import { Product } from "../model/product.model.js";
import { Category } from "../model/category.model.js";

const router = express.Router();

// get all products
// http://localhost:8000/product/getAllProduct
router.get("/getAllProduct", async(req,res)=>{
    try {
        const allProducts = await Product.find({});

        console.log(allProducts);
    // Respond with the list of products
         res.status(200).json(allProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// get a product by id
// http://localhost:8000/product/getProduct/:id
router.get("/getProduct/:id",async(req,res)=>{
    try {
        const id =req.params.id;
        const product = await Product.findById(id);
        console.log(product);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"interval error"});
    }
});
// create a product
// http://localhost:8000/product/createProduct
router.post("/createProduct", async (req, res) => {
  try {
    let { title, description, price, availability, category } = req.body;

    // Check if the category already exists or create a new one
    const existCategory = await Category.findOne({ name: category });
    if (!existCategory) {
      const newCategory = await Category.create({ name: category });
      category = newCategory._id;
    } else {
      category = existCategory._id;
    }

    // Create a new product using the Product model and associate it with the category
    const newProduct = await Product.create({
      title,
      description,
      price,
      availability,
      category,
    });

    // Respond with the saved product
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
