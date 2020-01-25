const express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  flash = require("connect-flash"),
  LocalStrategy = require("passport-local"),
  expressSession = require("express-session"),
  methodOverride = require("method-override");

  

const Office = require("./models/Office"),
  Review = require("./models/Review"),
  User = require("./models/User"),
  seedDB = require("./seeds");

const officeRoutes = require("./routes/offices"),
  authRoutes = require("./routes/auth"),
  indexRoute = require("./routes/index"),
  reviewRoutes = require("./routes/reviews");

const app = express(),
  PORT = 4000,
  ConnectionURL = "mongodb://localhost/office_rental";



mongoose.connect(ConnectionURL, { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());

//Passport CONF
app.use(
  expressSession({
    secret: "Hello, my project is the best",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoute);
app.use("/offices", officeRoutes);
app.use("/", authRoutes);
app.use("/offices/:id/reviews", reviewRoutes);

//Seed the DB
//seedDB();

app.listen(PORT, () => {
  console.log("Server is running on localhost:" + PORT);
  console.log("Office Rental Server Has Started");
});
