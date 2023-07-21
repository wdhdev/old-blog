import { Request, Response } from "express";

import User from "../models/User";

export default async (req: Request, res: Response) => {
    const authors = await User.find();

    const authorData = [];

    for(const author of authors) {
        authorData.push({
            "username": author.username,
            "firstName": author.firstName,
            "lastName": author.lastName,
        })
    }

    res.status(200).render("authors", { authors: authorData });
}
