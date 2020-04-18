var express = require("express"),
    app = express(),
    seedDb = require("./seeds"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    User = require("./models/user"),
    flash = require("connect-flash"),
    bodyParser = require("body-parser"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override");

// requiring routes
var authRoutes = require("./routes/index"),
    commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds");

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDb(); // seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This is the secret sentence!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// LOGIN CONFIGURATION
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ROUTES CONFIGURATION
app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, () => {
    console.log("server is running.....");
});