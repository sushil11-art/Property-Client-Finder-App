const { body, validationResult } = require("express-validator");

const landValidation = [
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

  body("images")
    .isArray()
    .withMessage("List of image url must be supplied in array"),
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

const homeValidation = [
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
    .withMessage("Bathroos must be an integer"),
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
    .withMessage("Floors must be an integer"),
  body("images")
    .isArray()
    .withMessage("List of image url must be supplied in array"),

  body("province")
    .not()
    .isEmpty()
    .trim()
    .isInt()
    .withMessage("Province must be an integer"),
  body("district").not().isEmpty().withMessage("District  is required"),
  body("municipality").not().isEmpty().withMessage("Municipality is required"),
  body("street").not().isEmpty().withMessage("Street is required"),
  body("ward")
    .not()
    .isEmpty()
    .trim()
    .isInt()
    .withMessage("Ward must be an integer"),
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

module.exports = { landValidation, homeValidation };
