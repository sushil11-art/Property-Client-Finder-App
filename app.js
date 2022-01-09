const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser=require("body-parser");
const indexRouter = require('./routes/index');
const jwtTokenAuthentication = require("./middlewares/jwtTokenAuthentication");
const fs = require("fs");
const API = require("./constant/API").API;
const db = require('./models');
const { uploadFilesMiddleware, uploadFileMiddleware } = require('./middlewares/upload');

// swagger import
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json');

// const swaggerFile = require("./swagger_output.json");


db.sequelize.sync();

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(uploadFilesMiddleware)
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${API.FILE_PREFIX}`,express.static(path.join(__dirname, API.FILE_STORE_FOLDER)));
if (!fs.existsSync(`./${API.FILE_STORE_FOLDER}`)){
  fs.mkdirSync(`./${API.FILE_STORE_FOLDER}`);
}
const whitelist = ['http://localhost:3000']
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {credentials: true, origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { credentials: true,origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();});

app.use(cors(corsOptionsDelegate));
// app.use(cors());
 app.use('', indexRouter);

//  use swagger doc
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err.stack)
  // render the error page
  res.status(err.status || 500);
  res.json({
    responseCode: err.status,
    message: err.message ,
    stack: err.stack})
});

module.exports = app;
