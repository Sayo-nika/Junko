// Copyright 2019 (c) Clarity Operations LLC
// 
// Licensed under MIT.

import { Controller, ApiController, HttpGet, HttpPost, BindNumber, SendsResponse } from "dinoloop";
import owo = require("owo.js");
import express = require("express");
import { Post } from "../models/post";
import { createConnection } from "typeorm";
import { config } from "../app";
import { PostCollection } from "../models/post-collection";

@Controller("/posts")
export class ContentController extends ApiController {
    
    @HttpGet("/")
    @HttpPost("/")
    @SendsResponse()
    async getContent() {
        const res: express.Response = this.response;
        const req : express.Request = this.request;
        const data = req.body.imageData.replace(/^data:image\/png;base64,/, "");
        const rawBuffer = Buffer.from(data, "base64");
        const hostedURL: string = await owo.upload(rawBuffer);

        if (req.method === "POST") createConnection(config.db).then(async connection => {
             let post = new Post();
             let postRepo = connection.manager.getRepository(Post);

             post.title = req.body.title;
             post.url = hostedURL;
             post.source = req.body.source;

             await postRepo.save(post);

             // if we send a 204 that means its OK now.
             res.writeHead(204);
             res.end();
           }).catch(e => {
             res.writeHead(500);
             return e;
        });

        createConnection(config.db).then(async connection => {
            const allPosts = await connection.manager.find(Post);
            return allPosts;
        }).catch(e => {
            res.writeHead(500)
            return e;
        });
    }

    @HttpGet("/:id")
    @SendsResponse()
    async getSpecificContent(@BindNumber() id: number) {
        const res: express.Response = this.response;

        createConnection(config.db).then(async connection => {
            const postRepo = connection.getRepository(Post);
            const post = await postRepo.find({id: id});

            return post;
        }).catch(e => {
            res.writeHead(500);
            return e;
        });
    }

    // we're using a regex to match both /collections and /collections/
    @HttpGet(/\/collections\/?/gi)
    @HttpPost(/\/collections\/?/gi)
    @SendsResponse()
    getCollections() {
        const res: express.Response = this.response;
        const req: express.Request = this.request;

        if (req.method === "POST") createConnection(config.db).then(async connection => {
            const collectionRepo = connection.manager.getRepository(PostCollection);
            const collection = new PostCollection();

            collection.title = req.body.title;
            collection.images = req.body.images;

            collectionRepo.save(collection);

            res.writeHead(204);
            res.end();
        });

        createConnection(config.db).then(async connection => {
            const collectionRepo = connection.manager.getRepository(PostCollection);
            const collections = collectionRepo.find();

            return collections;
        }).catch(e => {
            res.writeHead(500);
            return e;
        });
    }

    @HttpGet("/collections/:id")
    @SendsResponse()
    getSpecificCollection(@BindNumber() id: number) {
        const res: express.Response = this.response;

        createConnection(config.db).then(async connection => {
            const collectionRepo = connection.manager.getRepository(PostCollection);
            const collection = collectionRepo.findOneOrFail(id);

            return collection;
        }).catch(e => {
            res.writeHead(500);
            return e;
        })
    }
}
