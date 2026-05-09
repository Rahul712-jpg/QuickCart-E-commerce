import connectDB from "@/config/db"
import { getAuth } from "@clerk/nextjs/server"
import User from "@/models/User.js"

import { NextResponse } from "next/server";

export async function GET(request) {
    try{
           const {userId}=getAuth(request)
        //    console.log("userId from Clerk:", userId)
           
           if(!userId){
            return NextResponse.json({error:'Unauthorized'},{status:401})
           }

           await connectDB();
           const user=await User.findById(userId);
           // console.log("User from DB:", user)

           if(!user){
            return NextResponse.json({error:'User not found'},{status:401})   
           }
           return  NextResponse.json({user},{status:200})
    }catch(error){
        console.error("API Error:", error)
        return NextResponse.json({success:false,message:'Internal Server Error'},{status:500})
    }
}
