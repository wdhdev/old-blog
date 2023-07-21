import { Request, Response, Router } from "express";

const router = Router();
import routes from "./routes";

import { rateLimit } from "express-rate-limit";

const resetPasswordLimiter = rateLimit({
	windowMs: 60 * 60, // 1 hour
	max: 5, // 5 requests
	standardHeaders: true,
	legacyHeaders: false,
    message: {
        "message": "Too many requests, try again later.",
        "code": "RATE_LIMITED"
    }
})

router.get("/", async (req: Request, res: Response) => {
    routes.index(req, res);
})

router.get("/account", async (req: Request, res: Response) => {
    routes.account.index(req, res);
})

router.get("/account/change-password", async (req: Request, res: Response) => {
    routes.account["change-password"](req, res);
})

router.get("/account/reset-password", async (req: Request, res: Response) => {
    routes.account["reset-password"](req, res);
})

router.post("/api/auth/forgot-password", async (req: Request, res: Response) => {
    routes.api.auth["forgot-password"](req, res);
})

router.post("/api/auth/login", async (req: Request, res: Response) => {
    routes.api.auth.login(req, res);
})

router.delete("/api/posts", async (req: Request, res: Response) => {
    routes.api.posts(req, res);
})

router.get("/api/posts", async (req: Request, res: Response) => {
    routes.api.posts(req, res);
})

router.patch("/api/posts", async (req: Request, res: Response) => {
    routes.api.posts(req, res);
})

router.put("/api/posts", async (req: Request, res: Response) => {
    routes.api.posts(req, res);
})

router.patch("/api/user/password", async (req: Request, res: Response) => {
    routes.api.user.password(req, res);
})

router.put("/api/user/password", resetPasswordLimiter, async (req: Request, res: Response) => {
    routes.api.user.password(req, res);
})

router.get("/api/users", async (req: Request, res: Response) => {
    routes.api.users(req, res);
})

router.get("/auth/forgot-password", async (req: Request, res: Response) => {
    routes.auth["forgot-password"](req, res);
})

router.get("/auth/login", async (req: Request, res: Response) => {
    routes.auth.login(req, res);
})

router.get("/auth/logout", async (req: Request, res: Response) => {
    routes.auth.logout(req, res);
})

router.get("/author/:username", async (req: Request, res: Response) => {
    routes.author(req, res);
})

router.get("/authors", async (req: Request, res: Response) => {
    routes.authors(req, res);
})

router.get("/dashboard", async (req: Request, res: Response) => {
    routes.dashboard(req, res);
})

router.get("/post/create", async (req: Request, res: Response) => {
    routes.post.create(req, res);
})

router.get("/post/delete/:id", async (req: Request, res: Response) => {
    routes.post.delete(req, res);
})

router.get("/post/edit/:id", async (req: Request, res: Response) => {
    routes.post.edit(req, res);
})

router.get("/post/:id", async (req: Request, res: Response) => {
    routes.post.index(req, res);
})

router.get("*", async (req: Request, res: Response) => {
    routes[404](req, res);
})

export default router;
