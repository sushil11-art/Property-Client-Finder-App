const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const asyncHandler = require('express-async-handler')

exports.authenticateToken =asyncHandler(async (req, res, next) => {
    // Gather the jwt access token from the request header
    const token = req.headers['authorization']
    // console.log(req.headers);
    // console.log(token);
    // const token=authHeader
    // const token = authHeader && authHeader.split(' ')[1]
    if (token == null) throw createError(401,"Unauthorized Access")

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, user) => {
        // console.log(err)
        if (err) throw createError(401,"Unauthorized Access. Invalid Token")
        // console.log(user);
        req.user = user
        next() // pass the execution off to whatever request the client intended
    })
   
})
