const validator = require("./validator");
const { body } = require("express-validator");

class loginValidator extends validator {
  handle() {
    return [
      body("username")
        .not()
        .isEmpty()
        .withMessage("فیلد نام کاربری معتبر نیست"),
      body("password")
        .isLength({ min: 5 })
        .withMessage(" رمز عبور نمی تواند کمتر از 5 حرف باشد"),
    ];
  }
}

module.exports = new loginValidator();
