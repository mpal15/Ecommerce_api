import express from "express";
import { Category } from "../model/category.model.js";

const router = express.Router();

//get all category
// http://localhost:8000/category/getAllCategory
router.get("/getAllCategory",async(req,res)=>{
    try {
        const allcategory = await Category.find({});
        console.log(allcategory);
        res.status(200).json(allcategory);
    } catch (error) {
        console.log(erroor);
        res.status(500).json({"message":"internal error"})
    }
})
//create a new category
// http://localhost:8000/category/createCategory
router.post("/createCategory" ,async(req,res)=>{
    try {
        const { name }  = req.body;
    // check the category is empty or not
     if(!name){
        res.status(400).json({"message":"name field is compulsory"});
     }
    //  check the category in database or not
    const existCategory = await Category.findOne({name});
    if(existCategory){
        res.status(401).json({"message":"Category is already is exist in database"})
    }
    const category = await Category.create({
        name
    });
    console.log(name);
    res.status(200).json({"message": "category is successfully created"})
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"internal error"})
    }

})


export default router;