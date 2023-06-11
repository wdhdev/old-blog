const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: String,
    email: String,
    createdAt: {
        type: Date,
        expires: "30m"
    }
})

module.exports = mongoose.model("password-resets", schema, "password-resets");
