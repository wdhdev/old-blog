import { Request, Response } from "express";

import Post from "../../models/Post";

export default async (req: Request & any, res: Response) => {
    if(req.method === "DELETE") {
        if(!req.session.loggedIn) return res.status(401).json({ message: "You are not logged in.", code: "NOT_AUTHENTICATED" });

        if(!req.headers.id) return res.status(400).json({ message: "No post ID provided.", code: "NO_POST_ID" });

        if(!await Post.exists({ _id: req.headers.id })) return res.status(404).json({ message: "No post exists with that ID.", code: "POST_NOT_FOUND" });

        const data = await Post.findOne({ _id: req.headers.id });

        if(req.session.username !== data.author) return res.status(401).json({ message: "You are not the author of this post.", code: "NOT_AUTHOR" });

        await Post.findOneAndDelete({ _id: req.headers.id });

        res.status(200).json({ message: "Your post has been deleted.", code: "POST_DELETED" });
        return;
    }

    if(req.method === "GET") {
        const posts = await Post.find();

        const postData = [];

        for(const post of posts) {
            postData.push({
                id: post._id,
                timestamp: post.timestamp,
                editedTimestamp: post.editedTimestamp,
                author: post.author,
                image: post.image,
                title: post.title,
                description: post.description,
                body: post.body
            })
        }

        res.status(200).json(postData);
        return;
    }

    if(req.method === "PATCH") {
        if(!req.session.loggedIn) return res.status(401).json({ message: "You are not logged in.", code: "NOT_AUTHENTICATED" });

        if(!req.body.id) return res.status(400).json({ message: "No post ID provided.", code: "NO_POST_ID" });

        if(!await Post.exists({ _id: req.body.id })) return res.status(404).json({ message: "No post exists with that ID.", code: "POST_NOT_FOUND" });

        const data = await Post.findOne({ _id: req.body.id });

        if(req.session.username !== data.author) return res.status(401).json({ message: "You are not the author of this post.", code: "NOT_AUTHOR" });

        const timestamp = Date.now();

        await Post.findOneAndUpdate({ _id: req.body.id }, {
            editedTimestamp: timestamp,
            image: req.body.image,
            title: req.body.title || data.title,
            description: req.body.description || data.description,
            body: req.body.body || data.body
        })

        res.status(200).json({
            message: "Your post has been edited.",
            code: "POST_EDITED",
            timestamp: timestamp,
            old: {
                image: data.image,
                title: data.title,
                description: data.description,
                body: data.body
            },
            new: {
                image: req.body.image,
                title: req.body.title || data.title,
                description: req.body.description || data.description,
                body: req.body.body || data.body
            }
        })
        return;
    }

    if(req.method === "PUT") {
        if(!req.session.loggedIn) return res.status(401).json({ message: "You are not logged in.", code: "NOT_AUTHENTICATED" });

        if(!req.body.title) return res.status(400).json({ message: "No post title provided.", code: "NO_POST_TITLE" });
        if(!req.body.description) return res.status(400).json({ message: "No post description provided.", code: "NO_POST_DESCRIPTION" });
        if(!req.body.body) return res.status(400).json({ message: "No post body provided.", code: "NO_POST_BODY" });

        const id = require("crypto").randomUUID();

        let data = new Post({
            _id: id,
            timestamp: Date.now(),
            editedTimestamp: null,
            author: req.session.username,
            image: req.body.image || null,
            title: req.body.title,
            description: req.body.description,
            body: req.body.body
        })

        await data.save();

        res.status(200).json({ message: "Your post has been published.", code: "POST_PUBLISHED", id: id });
        return;
    }
}
