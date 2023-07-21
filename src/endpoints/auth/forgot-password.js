module.exports = async (req, res) => {
    if(req.session.loggedIn) return res.status(400).redirect("/dashboard");

    res.status(200).render("auth/forgot-password");
}