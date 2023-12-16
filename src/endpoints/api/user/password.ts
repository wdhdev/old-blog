import { Request, Response } from "express";
import User from "../../../classes/User";

import bcrypt from "bcrypt";

import ResetPassword from "../../../models/ResetPassword";
import UserModel from "../../../models/User";

export default async (req: Request & any, res: Response) => {
    if(req.method === "PATCH") {
        if(!req.session.loggedIn) return res.status(401).json({ message: "You are not logged in.", code: "NOT_AUTHENTICATED" });

        if(!req.body.currentPassword) return res.status(400).json({ message: "No current password provided.", code: "NO_CURRENT_PASSWORD" });
        if(!req.body.newPassword) return res.status(400).json({ message: "No new password provided.", code: "NO_NEW_PASSWORD" });

        const user = await UserModel.findOne({ username: req.session.username, email: req.session.email });

        if(!bcrypt.compareSync(req.body.currentPassword, user.password)) {
            res.status(401).json({ message: "Incorrect current password.", code: "INCORRECT_CURRENT_PASSWORD" });
        } else {
            await UserModel.findOneAndUpdate({ email: req.session.email }, { password: user.generateHash(req.body.newPassword) });

            // Clear session data
            req.session.loggedIn = false;
            req.session.name = null;
            req.session.firstName = null;
            req.session.lastName = null;
            req.session.username = null;
            req.session.email = null;

            res.status(200).json({ message: "Your password has been changed.", code: "PASSWORD_CHANGED" });
        }

        return;
    }

    if(req.method === "PUT") {
        if(req.session.loggedIn) return res.status(421).json({ message: "You have already logged in.", code: "ALREADY_AUTHENTICATED" });

        if(!req.body.token) return res.status(400).json({ message: "No token provided.", code: "NO_TOKEN" });
        if(!req.body.password) return res.status(400).json({ message: "No password provided.", code: "NO_PASSWORD" });

        if(!await ResetPassword.exists({ _id: req.body.token })) return res.status(400).json({ message: "Invalid token was provided.", code: "INVALID_TOKEN" });

        const data = await ResetPassword.findOne({ _id: req.body.token });

        await UserModel.findOneAndUpdate({ email: data.email }, { password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)) });
        await data.deleteOne();

        res.status(200).json({ message: "Your password has been changed.", code: "PASSWORD_CHANGED" });
        return;
    }
}
