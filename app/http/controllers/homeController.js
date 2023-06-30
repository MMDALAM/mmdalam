const controller = require("app/http/controllers/controller");
const Posted = require("app/models/posted");

class homeController extends controller {
  async index(req, res, next) {
    try {
      res.render("home/index");
    } catch (err) {
      next(err);
    }
  }

  async posted(req, res, next) {
    try {
      let result = await this.validationData(req);
      if (!result) {
        if (req.getLocale() == "en") {
          return this.alertAndBack(req, res, {
            title: " pay attention ",
            message:
              "Please check the request field again, all items are required",
            button: " resend ",
            icon: "error",
          });
        } else {
          return this.alertAndBack(req, res, {
            title: " دقت کنید ",
            message:
              " لطفا فیلد درخواست را مجدد بررسی کنید همه موارد را لازم است",
            button: "ارسال مجدد",
            icon: "error",
          });
        }
      }

      const posteds = await Posted.find(
        { seen: false } || { phone: req.body.phone }
      );
      console.log(posteds);

      if (posteds.length >= 2) {
        if (req.getLocale() == "en") {
          return this.alertAndBack(req, res, {
            title: " pay attention ",
            message:
              "Your previous request is under review, please wait for our experts to call you",
            button: " OK ",
            icon: "error",
          });
        } else {
          return this.alertAndBack(req, res, {
            title: "دقت کنید",
            message:
              " درخواست قبلی شما در حال بررسی است لطفا منتظر تماس کارشناسان ما باشید",
            button: " بسیار خب ",
            icon: "error",
          });
        }
      }

      let newPosted = new Posted({
        name: req.body.name,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message,
      });

      try {
        await newPosted.save();
        if (req.getLocale() == "en") {
          return this.alertAndBack(req, res, {
            title: " success ",
            message:
              "Your request has been sent successfully, please wait for us to contact you",
            button: " OK ",
            icon: "success",
          });
        } else {
          return this.alertAndBack(req, res, {
            title: " تبریک ",
            message:
              " در خواست شما با موفقیت ارسال شد لطفا منتظر تماس کارشناسان ما باشید ",
            button: " بسیار خب ",
            icon: "success",
          });
        }
      } catch (err) {
        next(err);
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new homeController();
