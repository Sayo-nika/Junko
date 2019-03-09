// Copyright 2019 (c) Clarity Operations LLC
// 
// Licensed under MIT.

import { Controller, ApiController, HttpGet, HttpPost, BindNumber } from "dinoloop";
import owo = require("owo.js");
import express = require("express");
import { Post } from "../models/post";

@Controller('/posts')
export class ContentController extends ApiController {
    
    @HttpGet("/")
    async getContent() {
        const res: express.Response = this.response;
        const allPosts = await Post.find();
        
        try {
            return allPosts;
        } catch(e) {
            res.writeHead(500);
            return JSON.stringify({code: "500", message: `Error: ${e}`});
        }
    }

    @HttpGet("/:id")
    async getSpecificContent(@BindNumber() id: number) {
        const res: express.Response = this.response;
        const postEntry = await Post.findOneOrFail({id: id});

        try {
            return postEntry;
        } catch(e) {
            res.writeHead(500);
            return JSON.stringify({code: "500", message: `Error: ${e}`});
        }
    }

    @HttpPost("/submit")
    async postContent() {
        const req: express.Request = this.request;
        const res: express.Response = this.response;
        const submission = new Post();
        const data = req.body.imageData.replace(/^data:image\/png;base64,/, "");
        const rawBuffer = Buffer.from(data, 'base64');
        const hostedURL: string = await owo.upload(rawBuffer);

        submission.title =  req.body.title;
        submission.url = hostedURL;
        submission.source = req.body.source;

        await submission.save();

        res.writeHead(204);
        res.end();
    }
}
