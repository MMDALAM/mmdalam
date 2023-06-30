const validator = require("./validator");
const { body } = require("express-validator");

class postedValidator extends validator {
  handle() {
    return [
      body("name").not().isEmpty().withMessage(" نام شما نمیتواند خالی بماند"),

      body("phone").not().isEmpty().withMessage(" شماره تلفن نباید خالی باشد "),

      body("subject").not().isEmpty().withMessage("موضوع نباید خالی باشد "),
    ];
  }
}

module.exports = new postedValidator();
