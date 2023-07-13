const User = require("../../models/User");

module.exports = async (req, res) => {
    if(req.method === "GET") {
        const users = await User.find();

        const userData = [];

        for(const user of users) {
            userData.push({
                "username": user.username,
                "first_name": user.firstName,
                "last_name": user.lastName
            })
        }

        res.status(200).json(userData);
        return;
    }

    if(req.method === "PUT") {
        return res.status(403).json({ "message": "This endpoint is not in use.", "code": "ENDPOINT_DISABLED" });

        const firstName = req.headers.firstName;
        const lastName = req.headers.lastName;
        const username = req.headers.username.toLowerCase();
        const email = req.headers.email.toLowerCase();
        const password = req.headers.password;

        if(!firstName) return res.status(400).json({ "message": "No first name provided.", "code": "NO_FIRST_NAME" });
        if(!lastName) return res.status(400).json({ "message": "No last name provided.", "code": "NO_LAST_NAME" });
        if(!username) return res.status(400).json({ "message": "No username provided.", "code": "NO_USERNAME" });
        if(!email) return res.status(400).json({ "message": "No email address provided.", "code": "NO_EMAIL" });
        if(!password) return res.status(400).json({ "message": "No password provided.", "code": "NO_PASSWORD" });

        if(await User.exists({ username: username })) return res.status(400).json({ "message": "An account already exists with this username.", "code": "USERNAME_TAKEN" });
        if(await User.exists({ email: email })) return res.status(400).json({ "message": "An account already exists with this email address.", "code": "EMAIL_TAKEN" });

        data = new User({
            created: Date.now(),
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email
        })

        data.password = data.generateHash(password);

        await data.save();

        // Set cookies
        req.session.loggedIn = true;
        req.session.name = `${firstName} ${lastName}`;
        req.session.firstName = firstName;
        req.session.lastName = lastName;
        req.session.username = username;
        req.session.email = email;

        res.status(200).json({ "message": "Your account has been created.", "code": "ACCOUNT_CREATED" });
        return;
    }
}