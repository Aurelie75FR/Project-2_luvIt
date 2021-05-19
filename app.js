require("dotenv").config();
require("./config/mongo");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("hbs");
var flash = require("connect-flash");
var session = require("express-session");

var indexRouter = require("./routes/index.routes");
var usersRouter = require("./routes/users.routes");
var dashboardRouter = require("./routes/dashboard.routes");
var authRouter = require("./routes/auth.routes");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true,
//     resave: true
//   })
// );

app.use(flash());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", dashboardRouter);
app.use("/", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

console.log(`http://localhost:${process.env.PORT}`);

module.exports = app;
