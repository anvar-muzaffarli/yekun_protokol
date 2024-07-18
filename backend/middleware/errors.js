import ErrorHandler from "../utils/errorHandler.js";


export default (err, req,res,next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error"
    }

    if(process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(error.statusCode).json({
            message: error.message,
            error:err,
            stack: err?.stack //xetanin bash verdiyi yer
        })
    }

    if(process.env.NODE_ENV === "PRODUCTION") {
       res.status(error.statusCode).json({
        message: error.message
       })
    }

}

