import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id: String,
    email: String,
    expireAt: {
        type: Date,
        default: new Date(),
        expires: 1800
    }
})

export default mongoose.model("password-resets", schema, "password-resets");
