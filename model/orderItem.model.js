import mongoose from "mongoose";


const orderItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    Quantity:{
        type:Number,
        required:true
    }
})

export const OrderItem = mongoose.model('OrderItem',orderItemSchema);