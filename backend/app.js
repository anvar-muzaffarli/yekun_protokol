import express from "express"
const app = express()
import {connectDatabase} from "./config/dbConnect.js"
import dotenv from "dotenv"


import cookieParser from "cookie-parser"
import errors from "./middleware/errors.js"

dotenv.config({path:'config/config.env'})

connectDatabase()



//  deploy ucun kodlar start
import path from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)




// deploy ucun kodlar end

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
import { fileURLToPath } from "url"

//express de arakatman proqramdi (middleware)
app.use('/api/v1', productRoutes)
app.use('/api/v1', authRoutes)

app.use(errors)



// DEPLOY UCUN KODLAR ARDI

if(process.env.NODE_ENV === "PRODUCTION") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req,res)=> {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"))
    } )
}





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







