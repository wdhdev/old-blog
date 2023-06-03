const userSchema = require("../models/userSchema");

module.exports = async (req, res) => {
    const authors = await userSchema.find();

    const authorData = [];

    for(const author of authors) {
        authorData.push({
            "username": author.username,
            "firstName": author.firstName,
            "lastName": author.lastName,
        })
    }

    res.status(200).render("authors", { authors: authorData });
}