var express = require("express");
var router = express.Router();

/* GET features page. */
router.get("/", function (req, res, next) {
  try {
    res.render("features", {});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
