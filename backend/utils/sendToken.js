// Token yaratmali, onu cookiede saxlanmaliyiq.

export default (user,statusCode, res) => {
    const token = user.JwtTokeniEldeEt()

    //xususiyyetler cookie ucun
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24*60*60*1000 ),
        httpOnly:true //backend (serverside terefden biz bu tokeni elde ede bilerik )
        // MFA
    }

    res.status(statusCode).cookie("token", token, options).json({
        // message:"Cookie yerleshdirildi"
        token
    })

}