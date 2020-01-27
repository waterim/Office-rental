const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", UserSchema);

module.exports = User;