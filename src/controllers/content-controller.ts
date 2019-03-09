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

        res.writeHead(503);
        res.setHeader("Content-Type", "application/json");
        return JSON.stringify({code: "503", message: "Parsing all data is not yet supported."});
    }

    @HttpGet("/:id")
    async getSpecificContent(@BindNumber() id: number) {
        const res: express.Response = this.response;
        const postEntry = await Post.findOneOrFail({id: id});

        try {
            res.setHeader("Content-Type", "application/json");
            return JSON.stringify(postEntry);
        } catch(e) {
            return e;
        }
    }

    @HttpPost("/submit")
    async postContent() {
        const req: express.Request = this.request;
        const res: express.Response = this.response;
        const submission = new Post();
        const data = req.body.imageData.replace(/^data:image\/png;base64,/, "");
        const rawBuffer = new Buffer(data, 'base64');
        const hostedURL = await owo.upload(rawBuffer);

        submission.title =  req.body.title;
        submission.url = hostedURL;
        submission.source = req.body.source;

        await submission.save();

        res.writeHead(204);
        res.end();
    }
}
