import { Request, Response } from "express";

import moment from "moment";

import Post from "../models/Post";

export default async (req: Request & any, res: Response) => {
    res.status(200).render("index", {
        posts: (await Post.find()).reverse(),
        session: {
            loggedIn: req.session.loggedIn
        },
        moment: moment
    })
}
