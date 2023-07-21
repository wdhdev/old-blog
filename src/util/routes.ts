import apiUsers from "../endpoints/api/users";
import author from "../endpoints/author";
import authors from "../endpoints/authors";
import dashboard from "../endpoints/dashboard";
import Error404 from "../endpoints/404";
import index from "../endpoints/index";

export default {
    404: Error404,
    account: {
        "change-password": require("../endpoints/account/change-password"),
        index: require("../endpoints/account"),
        "reset-password": require("../endpoints/account/reset-password")
    },
    api: {
        auth: {
            "forgot-password": require("../endpoints/api/auth/forgot-password"),
            login: require("../endpoints/api/auth/login")
        },
        posts: require("../endpoints/api/posts"),
        user: {
            password: require("../endpoints/api/user/password")
        },
        users: apiUsers
    },
    auth: {
        "forgot-password": require("../endpoints/auth/forgot-password"),
        login: require("../endpoints/auth/login"),
        logout: require("../endpoints/auth/logout")
    },
    author: author,
    authors: authors,
    dashboard: dashboard,
    index: index,
    post: {
        create: require("../endpoints/post/create"),
        delete: require("../endpoints/post/delete"),
        edit: require("../endpoints/post/edit"),
        index: require("../endpoints/post")
    }
}
