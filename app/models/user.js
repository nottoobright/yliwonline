/**
 * Created by Yash on 6/6/2017.
 */

var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String,
    firstName: String,
    lastName: String,
    dob: { type: Date },
    isAdmin: { type: Boolean, default: false }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);