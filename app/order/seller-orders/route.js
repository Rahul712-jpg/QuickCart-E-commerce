import authSeller from "@/lib/authSeller";
import {getAuth} from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import NextResponse from "next/server";
import Address from "@/models/Address";

export async function GET(){
    try{
         
        const {userId}=getAuth(request);
        const isSeller=await authSeller(userId);

        if(!isSeller){  
            return NextResponse.json({success:false,message:"Unauthorized"}, {status:401})
        }

        await connectDB();
        Address.length
        const orders=await Order.find({}).populate('address items.product')

        return NextResponse.json({success:true,orders}, {status:200})

    }catch(error){
        return NextResponse.json({success:false,message:"Unauthorized"}, {status:401})

    }
}