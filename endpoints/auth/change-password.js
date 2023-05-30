module.exports = async (req, res) => {
    if(!req.session.loggedIn) return res.status(401).redirect("/auth/login?redirect=auth/change-password");

    res.status(200).render("auth/change-password");
}