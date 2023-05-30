const { Router } = require("express");

const router = Router();
const routes = require("./routes");

router.get("/", async (req, res) => {
    routes.index(req, res);
})

router.get("/@:id", async (req, res) => {
    res.redirect(`/author/${req.params.id}`);
})

router.get("/account", async (req, res) => {
    routes.account(req, res);
})

router.post("/api/auth/login", async (req, res) => {
    routes.api.auth.login(req, res);
})

router.delete("/api/posts", async (req, res) => {
    routes.api.posts(req, res);
})

router.get("/api/posts", async (req, res) => {
    routes.api.posts(req, res);
})

router.patch("/api/posts", async (req, res) => {
    routes.api.posts(req, res);
})

router.put("/api/posts", async (req, res) => {
    routes.api.posts(req, res);
})

router.patch("/api/user/password", async (req, res) => {
    routes.api.user.password(req, res);
})

router.get("/api/users", async (req, res) => {
    routes.api.users(req, res);
})

router.put("/api/users", async (req, res) => {
    routes.api.users(req, res);
})

router.get("/auth/change-password", async (req, res) => {
    routes.auth["change-password"](req, res);
})

router.get("/auth/login", async (req, res) => {
    routes.auth.login(req, res);
})

router.get("/auth/logout", async (req, res) => {
    routes.auth.logout(req, res);
})

router.get("/author/:username", async (req, res) => {
    routes.author(req, res);
})

router.get("/authors", async (req, res) => {
    routes.authors(req, res);
})

router.get("/dashboard", async (req, res) => {
    routes.dashboard(req, res);
})

router.get("/post/create", async (req, res) => {
    routes.post.create(req, res);
})

router.get("/post/delete/:id", async (req, res) => {
    routes.post.delete(req, res);
})

router.get("/post/edit/:id", async (req, res) => {
    routes.post.edit(req, res);
})

router.get("/post/:id", async (req, res) => {
    routes.post.index(req, res);
})

router.get("*", async (req, res) => {
    routes[404](req, res);
})

module.exports = router;