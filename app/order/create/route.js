import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { inngest } from "@/config/Inngest";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { userId } = getAuth(req);

    const { address, items } = await req.json();

    if (!address || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Address and items are required" },
        { status: 400 }
      );
    }

    let amount = 0;

    for (const item of items) {
      const product = await Product.findById(item.product);
      amount += product.price * item.quantity;
    }

    await inngest.send({
      name: "order/created",
      data: {
        userId,
        address,
        items,
        amount: amount + Math.floor(amount * 0.2),
        date: Date.now(),
      },
    });

    const user = await User.findById(userId);
    user.cartItems = [];
    await user.save();

    return NextResponse.json(
      { success: true, message: "Order created successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}