const postSchema = require("../../models/postSchema");

module.exports = async (req, res) => {
    if(!req.session.loggedIn) return res.status(401).redirect(`/auth/login?redirect=post/delete/${req.params.id}`);

    if(!await postSchema.findOne({ _id: req.params.id })) return res.status(404).render("post/404");
    if(!await postSchema.findOne({ _id: req.params.id, author: req.session.username })) return res.status(403).render("post/delete/denied", { id: req.params.id });

    res.status(200).render("post/delete", { id: req.params.id });
}