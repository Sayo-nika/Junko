import { Controller, ApiController, HttpGet, HttpPost, BindNumber } from "dinoloop";
import owo = require("owo.js");
import express = require("express");
import { Post } from "../models/post";
import { SagiriController } from "./sagiri-controller";

@Controller('/posts')
export class ContentController extends ApiController {
    
    @HttpGet("/")
    async getContent() {
        return "Nya";
    }

    @HttpGet("/:id")
    async getSpecificContent(@BindNumber() id: number) {
        const postEntry = await Post.findOneOrFail({id: id});

        try {
            return postEntry;
        } catch(e) {
            return e;
        }
    }

    @HttpPost("/submit")
    async postContent() {
        const req: express.Request = this.request;
        const res: express.Response = this.response;
        const sagiri = new SagiriController();
        // we'll add this later.
        const submission = new Post();
        const data = req.body.imageData.replace(/^data:image\/png;base64,/, "");
        const rawBuffer = new Buffer(data, 'base64');
        const hostedURL = await owo.upload(rawBuffer);
        const sourceURL = await sagiri.getSource();

        submission.title =  req.body.title;
        submission.url = hostedURL;
        submission.source = sourceURL[0].url || null;

        await submission.save();

        res.writeHead(204);
    }
}
