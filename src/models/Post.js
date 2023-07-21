const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: String,
    timestamp: String,
    editedTimestamp: String,
    author: String,
    image: String,
    title: String,
    description: String,
    body: String
})

module.exports = mongoose.model("posts", schema, "posts")