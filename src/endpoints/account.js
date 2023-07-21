const gravatar = require("gravatar-url");

module.exports = async (req, res) => {
    if(!req.session.loggedIn) return res.status(401).redirect("/auth/login?redirect=account");

    res.status(200).render("account", {
        avatar: gravatar(req.session.email),
        name: req.session.name,
        username: req.session.username,
        email: req.session.email
    })
}