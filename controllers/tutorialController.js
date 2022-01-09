const asyncHandler = require('express-async-handler')
const createError = require('http-errors');
const db = require("../models");
// const Tutorial = db.tutorials;
// const op = db.Sequelize.Op;

// Create and Save a new Tutorial

// exports.create = asyncHandler(async(req, res)=>{
// // Validate request
//     if (!req.body.title) {
//         throw createError(400,"Param is missing in Request body");
//     }
//     try {
//         // Create a Tutorial
//         const tutorial = {
//             title: req.body.title,
//             description: req.body.description,
//             published: req.body.published ? req.body.published : false
//         };

//         // Save Tutorial in the database
//         const data = await Tutorial.create(tutorial);
//         return res.send(data);
//     }catch (e) {
//         throw createError(400, e.message || "Some error occurred while creating the Tutorial.");
//     }
// });
