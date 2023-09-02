import { Request, Response } from "express";

export default async (req: Request & any, res: Response) => {
    if(req.session.loggedIn) return res.status(200).redirect("/dashboard");

    res.status(200).render("auth/login");
}
