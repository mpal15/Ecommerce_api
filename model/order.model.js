const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  
orderitems:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Cart",
},
address:{
    type:String,
    required:true,
},

},{timestamps:true});


export const Order = mongoose.model('Order',orderSchema);