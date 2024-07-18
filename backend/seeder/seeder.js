import mongoose from "mongoose"

import products from "./data.js"

import product from "../models/product.js"
const seedProducts = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/backend-2")
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
