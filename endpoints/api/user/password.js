const userSchema = require("../../../models/userSchema");

module.exports = async (req, res) => {
    if(!req.session.loggedIn) return res.status(401).json({ "message": "You are not logged in.", "code": "NOT_AUTHENTICATED" });

    if(!req.body.currentPassword) return res.status(400).json({ "message": "No current password provided.", "code": "NO_CURRENT_PASSWORD" });
    if(!req.body.newPassword) return res.status(400).json({ "message": "No new password provided.", "code": "NO_NEW_PASSWORD" });

    userSchema.findOne({ username: req.session.username, email: req.session.email }, async function (err, user) {
        if(!user.validatePassword(req.body.currentPassword)) {
            res.status(401).json({ "message": "Incorrect current password.", "code": "INCORRECT_CURRENT_PASSWORD" });
        } else {
            await userSchema.findOneAndUpdate({ username: req.session.username }, { password: user.generateHash(req.body.newPassword) });

            // Remove cookies
            req.session.loggedIn = false;
            req.session.name = null;
            req.session.firstName = null;
            req.session.lastName = null;
            req.session.username = null;
            req.session.email = null;

            res.status(200).json({ "message": "Your password has been changed.", "code": "PASSWORD_CHANGED" });
        }
    })
}