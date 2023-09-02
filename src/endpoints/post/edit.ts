import { Request, Response } from "express";

import Post from "../../models/Post";

export default async (req: Request & any, res: Response) => {
    if(!req.session.loggedIn) return res.status(401).redirect(`/auth/login?r=post/edit/${req.params.id}`);

    if(!await Post.findOne({ _id: req.params.id })) return res.status(404).render("errors/404");
    if(!await Post.findOne({ _id: req.params.id, author: req.session.username })) return res.status(401).render("errors/401");

    res.status(200).render("post/edit", { post: await Post.findOne({ _id: req.params.id }) });
}
