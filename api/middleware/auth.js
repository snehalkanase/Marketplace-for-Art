
const ErrorHandler =require ("../utils/errorHandler");
const jwt = require("jsonwebtoken")
const User = require("../models/User");
const catchAsyncError = require("./catchAsyncError");

exports.isAuthenticatedUser = catchAsyncError(async (req, res , next) => {
    const { token } = req.cookies;
    console.log(token)
    if(!token) {
        return next(new ErrorHandler("Please login to access this resources", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
});