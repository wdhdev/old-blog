const gravatar = require("gravatar-url");
const moment = require("moment");

const Post = require("../models/Post");
const User = require("../models/User");

module.exports = async (req, res) => {
    if(!await User.findOne({ username: req.params.username })) return res.status(404).render("errors/404");

    const user = await User.findOne({ username: req.params.username });

    res.status(200).render("author", {
        author: {
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            username: req.params.username,
            avatar: gravatar(user.email)
        },
        posts: (await Post.find({ author: req.params.username })).reverse(),
        moment: moment
    })
}