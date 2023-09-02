import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema({
    created: String,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String
})

schema.methods.generateHash = function(input: string) {
    return bcrypt.hashSync(input, bcrypt.genSaltSync(8));
}

schema.methods.validatePassword = function(password: string) {
    return bcrypt.compareSync(password, this.password);
}

export default mongoose.model("users", schema, "users");
