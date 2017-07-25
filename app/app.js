/**
 * Created by Yash on 6/2/2017.
 */
//Requiring Modules
var User = require('./models/user'),
    express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    LocalStratergy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

var app = express.createServer();

//Setting Enviornment
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('view options', {
    layout: false
});
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://127.0.0.1/yliw-1");


//Passport Setup
app.use(require('express-session')({
    secret: "Literally some random shit",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//############
//GET Routes
//############
app.get("/", isLoggedIn, function(req, res) {
    User.findOne({ username: req.user.username }, function(err, obj) {
        if (err) {
            console.log(err);
            req.flash("error", "Opps! Something went wrong.");

        } else {;
            //Get dob from the Databse
            var usrDate = new Date(obj.dob);
            //Get today's date
            var today = new Date();

            console.log(usrDate);
            console.log(today);
            //Find difference by subtracting and diving by no.of milliseconds in a day
            var diffBetweenDays = Math.round((today - usrDate) / (1000 * 60 * 60 * 24));
            console.log(diffBetweenDays);

            var weeksAlive = Math.floor(diffBetweenDays / 7);
            console.log(weeksAlive);
            res.render("grid", { week: weeksAlive, usr: obj });
        }
    });

});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/register", function(req, res) {
    res.render("register");
});

//##############
//POST Routes
//##############

//Register Model
app.post("/register", function(req, res) {
    User.register(new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar,
        dob: req.body.dob
    }), req.body.password, function(err) {
        if (err) {
            console.log(err);
            req.flash("error", "Opps! Something went wrong.");

        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect("/");
            });
        }
    });
});

//Login Model
app.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    badRequestMessage: 'Invalid username or password',
    failureFlash: true
}), function(req, res) {
    User.findOne({ username: req.body.username }, function(err, usr) {
        if (err) {
            console.log(err);
            req.flash("error", "Opps! Something went wrong.");
        } else {
            res.render("grid", { username: usr });
        }
    })
});

//Logout Route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login");
});

// User Profiles
app.get("/users/:id", function(req, res) {
    User.findById(req.params.id, function(err, validUser) {
        if (err) {
            req.flash("error", "Opps! Something went wrong.");
            res.redirect("/");
        }
        res.render("show", { user: validUser });
    });
});

//Middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

exports.index = function(req, res) {
    res.render('grid', { user: User, express: express, mongoose: mongoose });
};


//Server
app.listen(3000, function() {
    console.log("Server Started.....");
});