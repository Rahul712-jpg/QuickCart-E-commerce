import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    
    user: {
        type: String,
        required: true,
        ref: "User"
    },

    items: [
        {
            product: {
                type: String,
                required: true,
                ref: "Product"
            },

            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    amount: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true,
        ref: "Address"
    },

    status: {
        type: String,
        default: "pending",
        required: true
    },

    date: {
        type: Number,
        required: true
    }

});

const Order =
    mongoose.models.Order ||
    mongoose.model("Order", orderSchema);

export default Order;