import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    orderItems : [{
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required : true
        },
         name: String,
         quantity: Number,
         price: Number,
    }],

    totalPrice : Number,
     isPaid: { 
        type: Boolean,
        default: false
      },

}, { timestamps : true})


export const orderModel =  mongoose.model("Order" , orderSchema);