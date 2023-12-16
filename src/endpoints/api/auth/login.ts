import { Request, Response } from "express";
import User from "../../../classes/User";

import bcrypt from "bcrypt";

import { default as UserModel } from "../../../models/User";

export default async (req: Request & any, res: Response) => {
    if(req.session.loggedIn) return res.status(421).json({ message: "You have already logged in.", code: "ALREADY_AUTHENTICATED" });

    const email = req.headers.email;
    const password = req.headers.password;

    if(!email) return res.status(400).json({ message: "No email address provided.", code: "NO_EMAIL" });
    if(!password) return res.status(400).json({ message: "No password provided.", code: "NO_PASSWORD" });

    const user = await UserModel.findOne({ email: email });

    if(!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ message: "Incorrect email or password.", code: "INCORRECT_CREDENTIALS" });
    } else {
        // Set cookies
        req.session.loggedIn = true;
        req.session.name = `${user.firstName} ${user.lastName}`;
        req.session.firstName = user.firstName;
        req.session.lastName = user.lastName;
        req.session.username = user.username;
        req.session.email = user.email;

        res.status(200).json({ message: "You have been logged in.", code: "LOGGED_IN" });
    }
}
