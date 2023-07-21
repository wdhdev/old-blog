import { Request, Response } from "express";

import gravatar from "gravatar-url";
import moment from "moment";

import Post from "../models/Post";
import User from "../models/User";

export default async (req: Request, res: Response) => {
    if(!await User.findOne({ username: req.params.username })) return res.status(404).render("errors/404");

    const user = await User.findOne({ username: req.params.username });

    res.status(200).render("author", {
        author: {
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            username: req.params.username,
            avatar: gravatar(user.email)
        },
        posts: (await Post.find({ author: req.params.username })).reverse(),
        moment: moment
    })
}
