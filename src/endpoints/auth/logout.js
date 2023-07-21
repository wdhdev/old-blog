module.exports = async (req, res) => {
    if(!req.session.loggedIn) return res.status(401).redirect("/auth/login");

    // Clear session data
    req.session.loggedIn = false;
    req.session.name = null;
    req.session.firstName = null;
    req.session.lastName = null;
    req.session.username = null;
    req.session.email = null;

    res.status(200).render("auth/logout");
}