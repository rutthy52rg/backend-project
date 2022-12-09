/* ========== librerias ============== */
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");

/* ========== libs ============== */

var i18n = require("./lib/i18nConfigure");
const basicAuthMiddleware = require("./lib/basicAuthMiddleware");
const sessionAuth = require("./lib/sessionAuthMiddleware");
const jwtAuthMiddleware = require("./lib/JWTAuthMiddleware");

/* ========== routes  ============== */
//importamos login llamando a la clase
const LoginController = require("./routes/loginController");
const PrivateController = require("./routes/privateController");

/* ========== instancias controladores  ============== */
const loginController = new LoginController();
const loginControllerAPI = new LoginController();
const privateController = new PrivateController();

/* ========== motor de vistas (views) ============== */
var app = express();
//configuración motor de vistas
// view engine setup --> formato html
app.set("views", path.join(__dirname, "views"));
//app.set("view engine", "ejs");
app.set("view engine", "html"); // usa motor de vista custom llamado html
app.engine("html", require("ejs").__express); // ese motor usa ejs y ahora renombramos las views a html

/* ========== conexiones  ============== */
//conexion base de datos mongodb
require("./lib/connectMongoose");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public/", express.static("./public"));

/* ========== multidiomas ============== */
//setup de i18n
app.use(i18n.init); //lee cabeceras a que idioma está y ya sabe que idioma poner y guarda cookies en change-locales. Para que lea correctamente las cookies tendrá que estar despues de cookieParser

/* ========== routas API  ============== */

// control acceso a la api por usuario y contraseña con BASICAUTH
// app.use(
//   "/api/anouncements",
//   basicAuthMiddleware,
//   require("./routes/api/anouncements")
// );

//control acceso a la api por usuario y contraseña por TOKEN JWT

app.use(
  "/api/anouncements",
  jwtAuthMiddleware,
  require("./routes/api/anouncements")
);
app.use("/api/login", loginControllerAPI.postJWT);

// middleware cookies session => control acceso a la WEB por usuario y contraseña con COOKIES
app.use(
  session({
    name: "nodepop-session",
    secret: ".OmbY'yR5e$^N-$mHRx",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, //2 días de inactividad de usuario expira
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING, //guardarmos en el store de mongoconnect en mongodb en lugar de memoria de servidor para no perder sesion cada vez que recarga la aplicación
    }),
  })
);

// middleware al que acceden todas las vistas, cojo de req la session y lo guardo en res.locals.session
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

/* ========== routes del website  ============== */

app.use("/", require("./routes/index"));
app.use("/features", require("./routes/features"));
app.use("/change-locale", require("./routes/change-locale"));
//with classes para facilitar testing
app.get("/login", loginController.index);
app.post("/login", loginController.post);
app.get("/logout", loginController.logout);
// uso del middleware guardando cookies sessionAuthMiddleware
app.get("/private", sessionAuth, privateController.index);

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
  res.json({ error: err.message });
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
