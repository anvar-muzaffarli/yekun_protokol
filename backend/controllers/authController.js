import catchAsyncErrors from "../middleware/catchAsyncErrors.js"
import sendToken from "../utils/sendToken.js"
import User from "../models/User.js"
import ErrorHandler from "../utils/errorHandler.js"

import crypto from "crypto"

import { getResetPasswordTemplate } from "../utils/emailTemplates.js"
import { sendEmail } from "../utils/sendEmail.js"


// module vs commonjs
export const register = catchAsyncErrors(async(req,res,next)=> {
    // const name = req.body.name
    // const email = req.body.email
    // const password = req.body.password
    const {name, email, password} = req.body

    //<input type="text" name="name"

    const user = await User.create({
        // name:name, email:email, password:password
        name, email, password 
    })
//Evveller bele idi (18-20)
    // res.status(201).json({
    //     user
    // })
sendToken(user, 201,res)


})




export const loginUser = catchAsyncErrors(async(req,res,next)=> {
    // const email = req.body.email
    const {email, password} = req.body

    if(!email || !password) {
        return next(new ErrorHandler("Zehmet olmasa email ve ya passwordu daxil et", 400))
    }

    //ORM Mongoose
    const user = await User.findOne({email}).select("+password")
    // $gt $lt $gte $lte >= <= > <
    if(!user) {

        //Unauthorized
        return next(new ErrorHandler("Istifadeci tapilmadi", 401))
    }


    const isPasswordMatched = await user.shifreleriMuqayiseEt(password)

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Shifre yanlishdir", 401))
    }

    // const token = user.JwtTokeniEldeEt()

    // res.status(200).json({
    //     token
    // })

    sendToken(user,200, res)

})

// SQL No-SQL Mongo DB Casandra Cosmos DB

export const logoutUser = catchAsyncErrors(async(req,res,next)=> {
    res.cookie("token", null, {
        expires:new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        message:"Logged out"
    })
})



//function expression

export const forgetPassword = catchAsyncErrors(async(req,res,next)=> {
    const user = await User.findOne({email: req.body.email})

    if(!user) {
        return next(new ErrorHandler("Bele bir istifadeci yoxdur", 404))
    }

    const resetToken = user.getPasswordToken()

    // business logic
    await user.save()

    // bu hisseni .env de elave et

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`


    const message = getResetPasswordTemplate(user?.name, resetUrl)

    try {
        await sendEmail({
            email: user.email,
            subject:"DEPO TRACKING SHIFRE SIFIRLAMA",
            // eger key:value eyndirse biz sadece key yaziriq :)
            message
        })
        res.status(200).json({
            message: `Shifre sifirlama linki gonderildi`
        })
    }

    catch(err) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        user.save()

        //ORM 
        return next(new ErrorHandler(err?.message, 500))

    }


})

export const resetPassword = catchAsyncErrors(async(req,res,next)=> {
        const resetPasswordToken = crypto.createHash("sha256").update(req?.params?.token).digest("hex")
        const user = await User.findOne({
            resetPasswordToken,
            // mongo db ve mongoose 
            resetPasswordExpire: {$gt:Date.now()}
        })

        if(!user) {
            return next(new ErrorHandler("Linkin muddeti bitmishdir", 400))
        }

        if(req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("Shifreler uygun deyil", 400))
        }

        user.password = req.body.password

        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        sendToken(user,200, res)

})

export const getUserProfile = catchAsyncErrors(async(req,res,next)=> {
    // _id
    const user = await User.findById(req?.user?._id)

    res.status(200).json({
        user
    })
})

export const updatePassword = catchAsyncErrors(async(req,res,next)=> {
    const user = await User.findById(req?.user?._id).select("+password")

    const shifrelerUygundurMu = user.shifreleriMuqayiseEt(req.body.oldPassword) 

    if(!shifrelerUygundurMu) {
        return next(new ErrorHandler("Shifreler uygun deyil", 400))
    }

    user.password = req.body.password
    user.save()

    res.status(200).json({
        message:"Shifre deyishdirildi",
        success:true
    })

    // react host toistify




})