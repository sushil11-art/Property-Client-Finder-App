const asyncHandler = require('express-async-handler')
const createError = require('http-errors');

// Create and Save a new Tutorial
exports.fetch = asyncHandler(async(req, res)=>{
    return res.send({status:200,data:{message:"Implement Logic"}});
});
