import Address from "@/models/Address";
import Product from "@/models/Product";
import Order from "@/models/Order";

import connectDB from "@/config/db";

import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request){

    try{

        const { userId } = getAuth(request);
        console.log("USER ID:", userId)

        await connectDB();

        const orders = await Order.find({ user: userId })
    .populate("address")
    .populate("items.product");

        return NextResponse.json(
            { success: true, orders },
            { status: 200 }
        );

    }catch(error){

        console.log(error);

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}