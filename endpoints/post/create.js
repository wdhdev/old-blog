module.exports = async (req, res) => {
    if(!req.session.loggedIn) return res.status(401).redirect("/auth/login?redirect=post/create");

    res.status(200).render("post/create");
}