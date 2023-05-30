module.exports = {
    "404": require("../endpoints/404"),
    "account": require("../endpoints/account"),
    "api": {
        "auth": {
            "login": require("../endpoints/api/auth/login")
        },
        "posts": require("../endpoints/api/posts"),
        "user": {
            "password": require("../endpoints/api/user/password")
        },
        "users": require("../endpoints/api/users")
    },
    "auth": {
        "change-password": require("../endpoints/auth/change-password"),
        "login": require("../endpoints/auth/login"),
        "logout": require("../endpoints/auth/logout")
    },
    "author": require("../endpoints/author"),
    "authors": require("../endpoints/authors"),
    "dashboard": require("../endpoints/dashboard"),
    "index": require("../endpoints/index"),
    "post": {
        "create": require("../endpoints/post/create"),
        "delete": require("../endpoints/post/delete"),
        "edit": require("../endpoints/post/edit"),
        "index": require("../endpoints/post/index")
    }
}