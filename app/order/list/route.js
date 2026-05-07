import AddAddress from "@/app/add-address/page";
import Address from "@/models/Address";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";


export async function GET(){
    try{
      const {userId}=getAuth()
        await connectDB();
        Address.length
        Product.length
        
        const orders=await Order.find({user:userId}).populate('address items.product')
          return NextResponse.json({success:true,orders}, {status:200})

    }catch(error){
        console.log(error)
        return NextResponse.json({success:false,message:error.message}, {status:500})
    }
}