import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    price : Number,
    image : String,

}, { timestamps : true})


export const productModel =  mongoose.model("Product" , productSchema);