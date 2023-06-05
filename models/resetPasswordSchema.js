const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: String,
    email: String,
    expires: String
})

module.exports = mongoose.model("password-resets", schema, "password-resets")