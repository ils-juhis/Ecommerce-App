const ErrorHandler = require("../utils/errorHandlers")

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";

    //wrong mondoDB id error
    if(err.name === "CastError"){
        const message = `Resource not foung, Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({success: false, error: err.message})
}

