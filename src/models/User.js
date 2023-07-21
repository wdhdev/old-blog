const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema({
    created: String,
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String
})

schema.methods.generateHash = function(input) {
    return bcrypt.hashSync(input, bcrypt.genSaltSync(8), null);
}

schema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("users", schema, "users")