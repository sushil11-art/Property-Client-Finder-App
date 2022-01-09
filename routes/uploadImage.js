const express = require("express");
const { uploadImages } = require("../controllers/uploadController");
const router = express.Router();

/* POST route ,upload images  AUTH:"/api/v1/public/upload" */

router.post("/upload", uploadImages);

module.exports = router;
