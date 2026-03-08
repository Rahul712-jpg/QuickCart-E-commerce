import { products } from "@/assets/productData";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{type:string , required:true,ref:"user"},
    items:[{
        product:{type:string,required:true,ref:"product"},
        quantity:{type:number,required:true}

    }],
    amount:{type:number,required:true},
    address:{type:string,required:true,ref:"address"},
    status:{type:string,default:"pending",required:true},
    date:{type:Number,required:true}
})

const Order = moongoose.models.Order || mongoose.model("Order",orderSchema)

export default Order;