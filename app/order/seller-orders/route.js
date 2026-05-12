import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";
import Order from "@/models/order";

export async function GET(req) {
    try {

        const { userId } = getAuth(req);

        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const orders = await Order.find({})
            .populate("address")
            .populate("items.product");

        return NextResponse.json(
            { success: true, orders },
            { status: 200 }
        );

    } catch (error) {

        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}