"use strict";

//mejor para poder luego hacer test unitarios
//se importará en app.js
const { User } = require("../models");

class PrivateController {
  async index(req, res, next) {
    try {
      const userId = req.session.userLoged;
      const user = await User.findById(userId);
      if (!user) {
        next(new Error("User not found"));
      }
      res.render("private", {
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = PrivateController;
