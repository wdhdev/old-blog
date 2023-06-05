module.exports = async (req, res) => {
    if(!req.session.loggedIn) return res.status(401).redirect("/auth/login?redirect=account/change-password");

    res.status(200).render("account/change-password");
}