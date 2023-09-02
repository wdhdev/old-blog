import _delete from "../endpoints/post/delete";
import account from "../endpoints/account";
import apiAuthForgotPassword from "../endpoints/api/auth/forgot-password";
import apiAuthLogin from "../endpoints/api/auth/login";
import authForgotPassword from "../endpoints/auth/forgot-password";
import authLogin from "../endpoints/auth/login";
import author from "../endpoints/author";
import authors from "../endpoints/authors";
import changePassword from "../endpoints/account/change-password";
import create from "../endpoints/post/create";
import dashboard from "../endpoints/dashboard";
import edit from "../endpoints/post/edit";
import error404 from "../endpoints/404";
import index from "../endpoints/index";
import logout from "../endpoints/auth/logout";
import password from "../endpoints/api/user/password";
import post from "../endpoints/post";
import posts from "../endpoints/api/posts";
import resetPassword from "../endpoints/account/reset-password";
import users from "../endpoints/api/users";

export default {
    404: error404,
    account: {
        "change-password": changePassword,
        index: account,
        "reset-password": resetPassword
    },
    api: {
        auth: {
            "forgot-password": apiAuthForgotPassword,
            login: apiAuthLogin
        },
        posts: posts,
        user: {
            password: password
        },
        users: users
    },
    auth: {
        "forgot-password": authForgotPassword,
        login: authLogin,
        logout: logout
    },
    author: author,
    authors: authors,
    dashboard: dashboard,
    index: index,
    post: {
        create: create,
        delete: _delete,
        edit: edit,
        index: post
    }
}
