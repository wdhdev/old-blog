import { Request, Response } from "express";

import gravatar from "gravatar-url";

import Post from "../models/Post";

export default async (req: Request & any, res: Response) => {
    if(!req.session.loggedIn) return res.status(401).redirect("/auth/login");

    res.status(200).render("dashboard", {
        avatar: gravatar(req.session.email),
        firstName: req.session.firstName,
        username: req.session.username,
        posts: (await Post.find({ author: req.session.username })).reverse()
    })
}
