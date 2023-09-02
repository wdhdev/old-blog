import { Request, Response } from "express";

import moment from "moment";

import Post from "../models/Post";
import User from "../models/User";

export default async (req: Request & any, res: Response) => {
    if(!await Post.findOne({ _id: req.params.id })) return res.status(404).render("errors/404");

    let username = null;

    if(req.session.loggedIn) username = req.session.username;

    const post = await Post.findOne({ _id: req.params.id });
    const author = await User.findOne({ username: post.author });

    res.status(200).render("post", {
        author: author,
        post: post,
        session: {
            loggedIn: req.session.loggedIn,
            username: username
        },
        moment: moment
    })
}