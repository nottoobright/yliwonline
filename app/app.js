/**
 * Created by Yash on 6/2/2017.
 */
//Requiring Modules
var User                  = require('./models/user'),
    express               = require('express'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    LocalStratergy        = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

var app = express.createServer();

//Setting Enviornment
app.use(express.static('public'));
app.set('view engine','ejs');
app.set('view options', {
  layout: false
});
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://127.0.0.1/yliw");


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
app.get("/", isLoggedIn, function (req, res) {
  res.render("grid",{user: req.user, username: req.user.username});
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

//##############
//POST Routes
//##############

//Register Model
app.post("/register", function (req, res) {
  User.register(new User({username: req.body.username, email: req.body.email, dob: req.body.dob}), req.body.password, function (err) {
    if(err){
      console.log(err);
    }
    else{
      passport.authenticate('local')(req, res, function () {
        res.redirect("/");
      });
    }
  });
});

//Login Model
app.post("/login", passport.authenticate('local',{
  successRedirect: "/",
  failureRedirect: "/login",
  badRequestMessage: 'Invalid username or password',
  failureFlash: true
}), function (req, res) {
  User.findOne({username: req.body.username}, function (err, usr) {
    if(err){
      console.log(err);
    }
    else {
      res.render("grid", {username: usr});
    }
  })
});

//Logout Route
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/login");
});

//Middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

exports.index = function (req, res) {
  res.render('grid',{user: User, express: express, mongoose: mongoose});
};


//Server
app.listen(3000, function () {
  console.log("Server Started.....");
});
