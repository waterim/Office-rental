const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: {
            type: String,
            required: true
        },
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ], 
    address: {
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
    }
});
let Office = mongoose.model("Office", officeSchema);

module.exports = Office;