import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import crypto from "crypto"

const userSchema = new mongoose.Schema({
    // UserAgent 
    name: {
        type: String,
        required:[true, "Zehmet olmasa daxil edin"],
        maxLength:[40, "Adiniz 40 simvolu asha bilmez"]
    }, 

   
    password: {
        type:String,
        required:[true, "Shifrenizi daxil edin"],
        minLength:[5, "Minimum 5 simvoldan ibaret olmalidir"],
        select:false
    },
    email: {
        type:String,
        unique:true,
        required:[true, "Emaili daxil edin!!!"]
    },
    avatar: {
       public_id: String,
       url:String
    },
    role : {
        type:String,
        default: "user"
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date  
}, 
{timestamps:true}
)

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next()
    }

    //this 
    // call apply bind
    // menimsetme
    this.password = await bcrypt.hash(this.password,10)
    
})

// call apply bind (this) , prototype ALERT SON GUN Iyul 2024
userSchema.methods.getPasswordToken = function() {

    //built-in methods
const resetToken = crypto.randomBytes(20).toString("hex") //a4572esd2214124f

this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

this.resetPasswordExpire = Date.now() + 30*60*1000

return resetToken

}







//encode decode shifreleme


userSchema.methods.JwtTokeniEldeEt = function() {
    return jwt.sign({
        id:this._id,
    
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    } )
}

userSchema.methods.shifreleriMuqayiseEt = async function(enteredPassword) {
//bcrypt.compare
return await bcrypt.compare(enteredPassword, this.password)

}

// console.log(await bcrypt.compare("Anvar1997", "$2a$12$.bupftS32UnGaPWC1fjWFuJkRU92J/zcjCqTciw6yJwlrQ2iyZbqy"))








export default mongoose.model("User", userSchema)