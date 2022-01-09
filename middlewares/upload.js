const util = require("util");
const multer = require("multer");
const API = require("../constant/API").API;
const maxSize = 5 * 1024 * 1024;



const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};



let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, API.FILE_STORE_FOLDER);
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        console.log(file);
        var type = file.originalname.split(".")[1];
        const now = new Date();
        // const str = file.mimetype.replace("image/", "");
        let randomString = (Math.random() + 1).toString(36).substring(7);
        const fileName=randomString+ "."+ type;
        cb(null,fileName);
    },
});

let uploadFile = multer({
    storage: storage,
    fileFilter:imageFilter,
    limits: { fileSize: maxSize },
}).single("file");

let uploadFiles = multer({
    storage: storage,
    fileFilter:imageFilter,
    limits: { fileSize: maxSize },
}).array("files",10);

let uploadFileMiddleware = util.promisify(uploadFile);
let uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = {uploadFileMiddleware,uploadFilesMiddleware};
