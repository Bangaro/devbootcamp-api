const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/async");
const errorResponse = require("../utils/errorResponse");
const User = require("../models/User");

//Protect routes
const protect = asyncHandler(async(req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(" ")[1];
        //Set token from cookie
    }
    // else if (req.cookies.token) {
    //     token = req.cookies.token;
    // }

    //Make sure token exists
    if (!token) {
        return next(new errorResponse("You are not logged in", 401));
    }

    try {
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new errorResponse("You are not logged in", 401));
    }
});

//Grant acces to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new errorResponse(
                    `User role ${req.user.role} is not authorized to access this route`,
                    403
                )
            );
        }
        next();
    };
};

module.exports = { protect, authorize };