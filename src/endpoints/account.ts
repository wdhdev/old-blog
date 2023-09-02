import { Request, Response } from "express";

import gravatar from "gravatar-url";

export default async (req: Request & any, res: Response) => {
    if(!req.session.loggedIn) return res.status(401).redirect("/auth/login?r=account");

    res.status(200).render("account", {
        avatar: gravatar(req.session.email),
        name: req.session.name,
        username: req.session.username,
        email: req.session.email
    })
}
