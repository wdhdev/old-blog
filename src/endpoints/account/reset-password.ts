import { Request, Response } from "express";

import ResetPassword from "../../models/ResetPassword";

export default async (req: Request & any, res: Response) => {
    if(req.session.loggedIn) return res.status(400).redirect("/auth/login?r=account");
    if(!req.query.token) return res.status(401).render("errors/401");
    if(!await ResetPassword.exists({ _id: req.query.token })) return res.status(401).render("errors/401");

    res.status(200).render("account/reset-password", { token: req.query.token });
}
