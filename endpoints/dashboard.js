const gravatar = require("gravatar-url");

const Post = require("../models/Post");

module.exports = async (req, res) => {
    if(!req.session.loggedIn) return res.status(401).redirect("/auth/login");

    res.status(200).render("dashboard", {
        avatar: gravatar(req.session.email),
        firstName: req.session.firstName,
        username: req.session.username,
        posts: (await Post.find({ author: req.session.username })).reverse()
    })
}