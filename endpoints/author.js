const gravatar = require("gravatar-url");
const moment = require("moment");

const postSchema = require("../models/postSchema");
const userSchema = require("../models/userSchema");

module.exports = async (req, res) => {
    if(!await userSchema.findOne({ username: req.params.username })) return res.status(404).render("author/404", { username: req.params.username });

    const user = await userSchema.findOne({ username: req.params.username });

    res.status(200).render("author", {
        author: {
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            username: req.params.username,
            avatar: gravatar(user.email)
        },
        posts: (await postSchema.find({ author: req.params.username })).reverse(),
        moment: moment
    })
}