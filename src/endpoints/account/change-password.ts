import { Request, Response } from "express";

export default async (req: Request & any, res: Response) => {
    if(!req.session.loggedIn) return res.status(401).redirect("/auth/login?r=account/change-password");

    res.status(200).render("account/change-password");
}
