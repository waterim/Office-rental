const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose"),
      validate = require("mongoose-validate")



const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [validate.email, "Is not correct email"]
    },
    username: {
        type: String,
        required: true
    },
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
})

UserSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", UserSchema);

module.exports = User;