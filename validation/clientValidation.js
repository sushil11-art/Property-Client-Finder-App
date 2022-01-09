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
    .isMobilePhone()
    .not()
    .isEmpty()
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
  body("landArea")
    .not()
    .isEmpty()
    .trim()
    .toFloat()
    .isFloat()
    .withMessage(
      "Land area cannot be empty,must be an integer or floating point number"
    ),
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
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
  // next();
];

// const validateAdditionalDetailsForHome = (
//   kitchens,
//   bathrooms,
//   bedrooms,
//   floors
// ) => {
//   let errors = [];
//   let regexPattern = /^-?[0-9]+$/;

//   // check if the passed number is integer or float
//   let kitchen = regexPattern.test(kitchens);
//   let bathroom = regexPattern.test(bathrooms);
//   let bedroom = regexPattern.test(bedrooms);
//   let floor = regexPattern.test(floors);

//   // if(propertyType==1){
//     // for home
//     if (!kitchen) {
//       const message = {
//         msg: "Kitchens must be a integer",
//       };

//       errors.push(message);
//     }
//     if (!bathroom) {
//       const message = {
//         msg: "Bathrooms must be a integer",
//       };
//       errors.push(message);
//     }
//     if (!bedroom) {
//       const message = {
//         msg: "Bedrooms must be a integer",
//       };
//       errors.push(message);
//     }
//     if(!(parseInt(floors))){
//       const message = {
//         msg: "Floors must be a integer or floating point value",
//       };
//       errors.push(message);
//     }
//     return errors;

//   }
// }

module.exports = { clientValidation };
