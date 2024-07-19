import mongoose from "mongoose"

import products from "./data.js"

import product from "../models/Product.js"
const seedProducts = async() => {
    try {
        await mongoose.connect("mongodb+srv://anvarkhalid:anvar123@cluster0.fg2os4f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        await product.deleteMany()
        console.log("Mehsullar silindi")
        await product.insertMany(products)
        console.log("Mehsullar elave edildi")

        process.exit()

    }

    catch(err) {
        console.log("Gozlenilmez xeta", err.message)
        process.exit()
    }
}


seedProducts()

// One to one
// One to Many
