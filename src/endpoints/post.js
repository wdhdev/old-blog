const moment = require("moment");

const Post = require("../models/Post");
const User = require("../models/User");

module.exports = async (req, res) => {
    if(!await Post.findOne({ _id: req.params.id })) return res.status(404).render("errors/404");

    let username = null;

    if(req.session.loggedIn) username = req.session.username;

    const post = await Post.findOne({ _id: req.params.id });
    const author = await User.findOne({ username: post.author });

    res.status(200).render("post", {
        author: author,
        post: post,
        session: {
            loggedIn: req.session.loggedIn,
            username: username
        },
        moment: moment
    })
}