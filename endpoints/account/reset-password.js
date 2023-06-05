const resetPasswordSchema = require("../../models/resetPasswordSchema");

module.exports = async (req, res) => {
    if(req.session.loggedIn) return res.status(400).redirect("/auth/login?redirect=account");
    if(!req.query.token) return res.status(401).render("errors/401");
    if(!await resetPasswordSchema.exists({ _id: req.query.token })) return res.status(401).render("errors/401");

    res.status(200).render("account/reset-password", { token: req.query.token });
}