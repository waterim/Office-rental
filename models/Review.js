const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    text: String,
    author: String
});

let Review = mongoose.model("Review", reviewSchema);

module.exports = Review;