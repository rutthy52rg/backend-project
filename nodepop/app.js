var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const basicAuthMiddleware = require("./lib/basicAuthMiddleware");


var app = express();
// view engine setup --> formato html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//conexion base de datos mongodb
require("./lib/connectMongoose");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public/", express.static("./public"));

/*
/** CONTROLADORES....ARCHIVOS DE RUTA
 */

/**
 * RUTAS DEL API
 */
app.use(
  "/api/anouncements",
  basicAuthMiddleware,
  require("./routes/api/anouncements")
);

/**
 * RUTAS DEL WEBSITE
 */
app.use("/",   require('./routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  // si es una petición al API, responderemos con JSON
  // if (req.originalUrl.startsWith("/api/")) {
  //   res.json({ error: err.message });
  //   return;
  // }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
