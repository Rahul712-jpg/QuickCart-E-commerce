import connectDB from "@/config/db"
import { getAuth } from "@clerk/nextjs/server"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function GET(request) {

    try {

        const { userId } = getAuth(request)
          
        console.log( userId)

        await connectDB()

        const user = await User.findById(userId)

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            user
        })

    } catch(error) {

        console.log(error)

        return NextResponse.json(
            {
                success:false,
                message:'Internal Server Error'
            },
            { status:500 }
        )
    }
}