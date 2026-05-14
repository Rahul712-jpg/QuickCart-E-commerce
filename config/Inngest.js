import {Inngest} from "inngest";
import User from '@/models/User';
import connectDB from "./db";
import Order from "@/models/Order";

export const inngest = new Inngest({id:"quickcart"});

// Inngest function save user data to database
export const syncUserCreation=inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {
        event:'clerk/user.created'

    },
    async({event})=>{
         console.log("INNGEST EVENT RECEIVED")
console.log(event.data)
        const {id,first_name,last_name,email_addresses,image_url} = event.data;
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name+' '+last_name,
            imageUrl:image_url

        }
        await connectDB();
        await User.create(userData);
    }
)

// inngest funtion to udate dat in  database

export const syncUserUpdation=inngest.createFunction(
    {
        id:'update-user-from-clerk'
    },
    { event:'clerk/user.updated'},
    async({event})=>{
        
        const {id,first_name,last_name,email_addresses,image_url} = event.data;
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name+" "+last_name,
            imageUrl:image_url
        }
            await connectDB()
            await User.findByIdAndUpdate(id,userData)
    }
)

//inngest function to detlte user function to delete user database

export const syncUserDeletion=inngest.createFunction(
    {
    id:'delete-user-from-clerk'


},    {
    event:'clerk/user.deleted'
},
async({event})=>{
    
    const {id}=event.data;

    await connectDB();
    await User.findByIdAndDelete(id);
}

)

export const createUserOrder=inngest.createFunction({
    id:'create-user-order',
    batchEvents:{
        maxSize:5,
        timeout:'5s'
    }

}  ,{event:'order/created'},
async({events})=>{
    
     const orders=events.map((event)=>{
        return {
            user:event.data.userId,
            items:event.data.items,
            amount:event.data.amount,
            address:event.data.address,
            date:event.data.date

        }
     })
     await connectDB();
     await Order.insertMany(orders)
     return {success:true,message:"Orders created successfully",processed:orders.length}
}

)