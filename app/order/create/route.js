import { getAuth } from "@clerk/nextjs/server";
import NextResponse from "next/server";
import Product from "@/models/Product";
import { inngest } from "@/config/Inngest";
import User from "@/models/User";

export async function POST(req){
    console.log("API HIT")
    try{

        const {userId}=getAuth()
         const {Address,items}=await request.json()
        if(!Address|| items.length===0){
            return NextResponse.json({success:false,message:"Address and items are required"}, {status:400})
        }

        const amount=items.reduce(async(acc,item)=>{
            const product=await Product.findById(item.product);
            return await acc+product.price*item.quantity
        },0)
      await inngest.send({
        name:'order/created',
        data:{
            userId,
            address,
            items,
            amount:amount+Math.floor(amount*0.2),
            date:Date.now()
            
      }})

      //clear 
      const user=await User.findById(userId);
        user.cartItems=[];
        await user.save();

        return NextResponse.json({success:true,message:"Order created successfully"}, {status:200})
         
    }catch(error){
        console.log(error)
        return NextResponse.json({success:false,message:error.message}, {status:500})
    }
}