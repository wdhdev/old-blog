const SendGrid = require("@sendgrid/mail");

const ResetPassword = require("../../../models/ResetPassword");
const User = require("../../../models/User");

module.exports = async (req, res) => {
    if(req.session.loggedIn) return res.status(421).json({ "message": "You have already logged in.", "code": "ALREADY_AUTHENTICATED" });

    if(!req.body.email) return res.status(400).json({ "message": "No email address provided.", "code": "NO_EMAIL" });

    if(!await User.exists({ email: req.body.email.toLowerCase() })) return res.status(400).json({ "message": "No account matches the email address provided.", "code": "NO_ACCOUNT" });
    if((await ResetPassword.find({ email: req.body.email.toLowerCase() })).length >= 3) return res.status(429).json({ "message": "Too many requests, try again later.", "code": "RATE_LIMITED" });

    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    SendGrid.setApiKey(process.env.sendgrid_api_key);

    const token = require("crypto").randomUUID();

    new ResetPassword({
        _id: token,
        email: req.body.email.toLowerCase(),
        expireAt: Date()
    }).save()

    const resetEmail = {
        to: req.body.email.toLowerCase(),
        from: `${process.env.from_name} <${process.env.from_email}>`,
        subject: `Reset Password: ${user.email}`,
        text: `Hello ${user.firstName},\n\nPlease click the link below to reset your password:\nhttps://williamharrison.blog/account/reset-password?token=${token}\n\nThis link will expire in 30 minutes.\nIf you did not request this, you can ignore this email.\n\nKind regards,\nWilliam's Blog`,
        html: `Hello <strong>${user.firstName}</strong>,<br><br>Please click the link below to reset your password:<br><a href="https://williamharrison.blog/account/reset-password?token=${token}">Reset Password</a><br><br>This link will expire in 30 minutes.<br>If you did not request this, you can ignore this email.<br><br>Kind regards,<br>William's Blog`
    }

    try {
        await SendGrid.send(resetEmail);

        res.status(200).json({ "message": "A password reset email has been sent.", "code": "EMAIL_SENT" });
    } catch {
        res.status(500).json({ "message": "An error occurred.", "code": "SERVER_ERROR" });
    }
}