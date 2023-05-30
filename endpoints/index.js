const moment = require("moment");

const postSchema = require("../models/postSchema");

module.exports = async (req, res) => {
    res.status(200).render("index", { posts: (await postSchema.find()).reverse(), moment: moment, loggedIn: req.session.loggedIn });
}