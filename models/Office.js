const mongoose = require("mongoose");

const officeSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});
let Office = mongoose.model("Office", officeSchema);

module.exports = Office;