import catchAsyncErrors from "./catchAsyncErrors.js";

import ErrorHandler from "../utils/errorHandler.js"

import User from "../models/User.js"
import jwt from "jsonwebtoken"



// console.log(1)

// setTimeout(function(){
//     console.log(2)
// }, 0)

// console.log(3)

//Event Loop Lexical Enviroment Heap  Stack
// Garbage Collector

export const isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=> {
// const token = req.cookies.token
const {token} = req.cookies

if(!token) {
    return next(new ErrorHandler("Bu resurslara daxil olmaq ucun girish etmelisen", 401))

}

const decoded = jwt.verify(token,process.env.JWT_SECRET)
// {
//     iat:34543534,
//     eit:3232534535,
//     id:
// }

req.user = await User.findById(decoded.id)

next()

})


// const s2 = ["Isgender", "Rufet"]

// console.log(s2.includes("Adil"))
// const s3 = ["Ilkin", "Solmaz", "Rashid"]

// //mutable immutable

// const telebeler = [...s2, ...s3]
export const authorizeRoles = (...roles) => {

    //closure arashdirilsin
    return (req,res,next) => {
        if(!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Selahiyyeti ${req.user.role} olan shexs bu resurslara girish ede bilmez!`,403))
        }
        
        next()




    }
}