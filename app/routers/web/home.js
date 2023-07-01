const experss = require("express");
const router = experss.Router();

//controllers
const homeController = require("app/http/controllers/homeController");

//validators
const postedValidator = require("app/http/validators/postedValidator");

//home Rouer
router.get("/", homeController.index);

//posted
router.post("/posted", postedValidator.handle(), homeController.posted);

module.exports = router;
