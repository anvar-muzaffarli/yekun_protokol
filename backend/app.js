import express from "express"
const app = express()
import {connectDatabase} from "./config/dbConnect.js"
import dotenv from "dotenv"


import cookieParser from "cookie-parser"
import errors from "./middleware/errors.js"

dotenv.config({path:'config/config.env'})

connectDatabase()

// console.log(hello)

//Handle uncaught exceptions

process.on("uncaughtException", (err)=> {
    console.log(`Xeta budur ${err}`)
    console.log(`Tutula bilmeyen exception `)
    process.exit(1)
})

app.use(express.json())
app.use(cookieParser())

// Bura marshrutlar gelecek
import productRoutes from "./routes/products.js"
import authRoutes from "./routes/users.js"

//express de arakatman proqramdi (middleware)
app.use('/api/v1', productRoutes)
app.use('/api/v1', authRoutes)

app.use(errors)



const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server ${process.env.PORT} -cu portda calisir...`)
})

//handle undhandled rejections

process.on("unhandledRejection", (err) => {
    console.log(`Xetanin sebebi ${err}`)
    console.log(`Ele alinmaz server xetalari sebebinden server sonduruldu`)
    server.close(()=> {
        process.exit(1)
    })
})







