import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.config.js";
import cookieParser from "cookie-parser";
import auth from "./middleware/auth.js";



const app = express();
dotenv.config({
    path: './.env'
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/',(req,res)=>{
    res.send("hello mohit")
})
// user routes
import usersRoute from "./router/users.js"
app.use('/users', usersRoute);
// category routes
import categoryRoute from "./router/category.js"
app.use("/category",categoryRoute);
// product routes
import productRoute from "./router/product.js"
app.use("/product",productRoute);
// Cart routes
import cartRoute from "./router/cart.js"
app.use("/cart",auth,cartRoute);
// Order routes
import orderRoute from "./router/order.js"
app.use("/order",orderRoute);

connectDB()
.then(()=> {
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
})