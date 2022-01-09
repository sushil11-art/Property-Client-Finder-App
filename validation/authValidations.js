const { body, validationResult } = require("express-validator");

const registerValidation = [
  body("username").not().isEmpty().isLength({min:6}).withMessage("Username is required"),
  body("password")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("Password of minimum length 8 is required"),
  body("email")
    .not()
    .isEmpty()
    .isEmail()
    .withMessage("Must entered a valid email"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

const changePasswordValidation = [
  body("oldPassword").not().isEmpty().withMessage("Old password is required"),
  body("newPassword")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("New password of minimum length 8 is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

module.exports = { registerValidation, changePasswordValidation };
