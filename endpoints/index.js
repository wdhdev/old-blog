const moment = require("moment");

const Post = require("../models/Post");

module.exports = async (req, res) => {
    res.status(200).render("index", {
        posts: (await Post.find()).reverse(),
        session: {
            loggedIn: req.session.loggedIn
        },
        moment: moment
    })
}