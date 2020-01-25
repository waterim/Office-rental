const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");



const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    
})

UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", UserSchema);

module.exports = User;