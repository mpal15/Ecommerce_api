import mongoose from "mongoose";

// const orderItemSchema = new mongoose.Schema({
//     productId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//     },
//     Quantity:{
//         type:Number,
//         required:true
//     }
// })




const cartSchema = new mongoose.Schema({
    orderPrice:{
        type:Number,
        required:true,
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ordersItems:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: "OrderItem",
        required:true
    }
},{timestamps:true});

export const Cart = mongoose.model('Cart',cartSchema);