import { Request, Response } from "express";

export default async (req: Request & any, res: Response) => {
    if(req.session.loggedIn) return res.status(400).redirect("/dashboard");

    res.status(200).render("auth/forgot-password");
}
