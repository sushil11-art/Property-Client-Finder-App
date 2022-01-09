const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { uploadFilesMiddleware } = require("../middlewares/upload");
const API = require("../constant/API").API;

// Create and Save a new Tutorial
exports.uploadImages = asyncHandler(async (req, res) => {
//   await uploadFilesMiddleware(req, res);
  console.log(req.files);
  try{
    if (req.files === undefined) {
      throw createError(400, "Please upload a file!");
    }
    let images = [];
    for (const file of req.files) {
      // console.log(file);
      images.push(file.path);
    }
    return res.send({
      status: 200,
      data: { message: "Files uploaded successfully", images },
    });
  }
  catch(err){
    console.log(err);
  }
 
  
});

