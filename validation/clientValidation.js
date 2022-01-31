const { body, validationResult, oneOf } = require("express-validator");
const property = require("../models/property");

const clientValidation = [
  body("name").not().isEmpty().withMessage("Client name  is required"),
  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Client email  is required"),
  body("propertyType")
    .not()
    .isEmpty()
    .trim()
    .isInt()
    .withMessage("Property Type must be an integer"),
    body("phone")
    .not()
    .isEmpty()
    .isInt()
    .trim()
    // .matches(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)
    .withMessage("Valid mobile number is required"),


  // oneOf([
  //   [
  body("price")
    .not()
    .isEmpty()
    .trim()
    .toFloat()
    .isFloat()
    .withMessage(
      "Price cannot be empty,must be an integer or floating point number"
    ),
    body("ropani")
    .not()
    .isEmpty()
    .trim()
    .toFloat()
    .isFloat()
    .withMessage(
      "Ropani cannot be empty,must be an integer or floating point number"
    ),
    body("aana")
    .not()
    .isEmpty()
    .trim()
    .toFloat()
    .isFloat()
    .withMessage(
      "Aana cannot be empty,must be an integer or floating point number"
    ),
  // body("landArea")
  //   .not()
  //   .isEmpty()
  //   .trim()
  //   .toFloat()
  //   .isFloat()
  //   .withMessage(
  //     "Land area cannot be empty,must be an integer or floating point number"
  //   ),
  body("roadAccess")
    .not()
    .isEmpty()
    .withMessage("Description of road access is required"),
  body("waterSupply")
    .not()
    .isEmpty()
    .withMessage("Description of water supply is required"),
  body("kitchens")
    .not()
    .isEmpty()
    .trim()
    .isInt()
    .withMessage("Kitchens must be an integer"),
  body("bathrooms")
    .not()
    .isEmpty()
    .trim()
    .isInt()
    .withMessage("Bathrooms must be an integer"),
  body("bedrooms")
    .not()
    .isEmpty()
    .trim()
    .isInt()
    .withMessage("Bedrooms must be an integer"),
  body("floors")
    .not()
    .isEmpty()
    .trim()
    .toFloat()
    .isFloat()
    .withMessage("Floors must be an integer or floating point"),
  body("province")
    .not()
    .isEmpty()
    .trim()
    .isInt()
    .withMessage("Province must be an integer"),
  body("district").not().isEmpty().withMessage("District  is required"),
  body("municipality").not().isEmpty().withMessage("Municipality is required"),
  body("street").not().isEmpty().withMessage("Street is required"),
  body("ward").not().isEmpty().trim().isInt().withMessage("Must be an integer"),
  body("latitude")
    .not()
    .isEmpty()
    .trim()
    .toFloat()
    .isFloat()
    .withMessage("Latitude must be an integer or floating point number"),
  body("longitude")
    .not()
    .isEmpty()
    .trim()
    .toFloat()
    .isFloat()
    .withMessage("Longitude must be an integer or floating point number"),

  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors.array());
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
  // next();
];



module.exports = { clientValidation };
