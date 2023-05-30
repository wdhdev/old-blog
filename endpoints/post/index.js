const moment = require("moment");

const postSchema = require("../../models/postSchema");
const userSchema = require("../../models/userSchema");

module.exports = async (req, res) => {
    if(!await postSchema.findOne({ _id: req.params.id })) return res.status(404).render("post/404");

    let username = null;

    if(req.session.loggedIn) username = req.session.username;

    const post = await postSchema.findOne({ _id: req.params.id });
    const author = await userSchema.findOne({ username: post.author });

    res.status(200).render("post", {
        author: author,
        post: post,
        moment: moment,
        loggedIn: req.session.loggedIn,
        username: username
    })
}