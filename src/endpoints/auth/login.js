module.exports = async (req, res) => {
    if(req.session.loggedIn) return res.status(200).redirect("/dashboard");

    res.status(200).render("auth/login");
}