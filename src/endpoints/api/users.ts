import { Request, Response } from "express";

import User from "../../models/User";

export default async (req: Request & any, res: Response) => {
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
}