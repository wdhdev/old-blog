import mongoose from "mongoose";

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

export default mongoose.model("posts", schema, "posts");
