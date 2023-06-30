const controller = require("app/http/controllers/controller");
const Posted = require("app/models/posted");
const passport = require("passport");
const ExcelJs = require("exceljs");

class homeController extends controller {
  async index(req, res, next) {
    try {
      let page = req.query.page || 1;
      let posteds = await Posted.paginate(
        {},
        {
          page,
          sort: { number: 1 },
          limit: 15,
        }
      );
      res.render("admin/index", { posteds });
    } catch (err) {
      next(err);
    }
  }

  async delete(req, res, next) {
    try {
      const posted = await Posted.findById(req.params.id);

      await posted.remove();
      return this.back(req, res);
    } catch (err) {
      next(err);
    }
  }

  async seen(req, res, next) {
    try {
      await Posted.findByIdAndUpdate(req.params.id, {
        $set: { seen: true },
      });
      return this.back(req, res);
    } catch (err) {
      next(err);
    }
  }

  async excel(req, res, next) {
    try {
      const stream = res.writeHead(200, {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": "attachment; filename = applicant.xlsx",
      });
      const posteds = await Posted.find({});

      const workbook = new ExcelJs.Workbook();
      const worksheet = workbook.addWorksheet("Posted");

      /*TITLE*/

      worksheet.columns = [
        { header: " نام و نام خانوادگی ", key: "name", width: 25 },
        { header: " شماره تلفن ", key: "phone", width: 15 },
        { header: " نوع کاربری ", key: "type", width: 15 },
        { header: " نوع خدمات ", key: "service", width: 15 },
        { header: " متراژ ", key: "size", width: 20 },
        { header: " متن ارسالی ", key: "message", width: 45 },
      ];

      posteds.forEach((user) => {
        worksheet.addRow(user);
      });

      worksheet.getRow(1).font = {
        name: "Arial",
        family: 2,
        size: 15,
        bold: true,
      };

      worksheet.getColumn(1).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.getColumn(2).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.getColumn(3).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.getColumn(4).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.getColumn(5).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.getColumn(6).alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      worksheet.getColumn(1).font = {
        name: "Arial",
        family: 2,
        size: 15,
        bold: true,
      };

      await workbook.xlsx.write(stream);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      res.render("auth/auth");
    } catch (err) {
      next(err);
    }
  }

  async loginProccess(req, res, next) {
    try {
      let result = await this.validationData(req);
      if (result) return this.log(req, res, next);
      return this.back(req, res);
    } catch (err) {
      next(err);
    }
  }

  async log(req, res, next) {
    try {
      passport.authenticate("local.login", {
        successRedirect: "/admin/mmdalam",
        failureRedirect: "/admin/login",
        failureFlash: true,
      })(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new homeController();
