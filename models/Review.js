const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

let Review = mongoose.model("Review", reviewSchema);

module.exports = Review;