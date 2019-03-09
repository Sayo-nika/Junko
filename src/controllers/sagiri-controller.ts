// Copyright 2019 (c) Clarity Operations LLC
// 
// Licensed under MIT.

import {Handler} from 'sagiri';
import express = require("express");
import {Controller, ApiController, HttpPost, SendsResponse } from 'dinoloop';
import {config} from "../app";

const sauceClient: Handler = new Handler(process.env.FRANCHOUCHOU_SAUCENAO_KEY || config.sauceNaoKey, {numRes: 2, getRating: true});

@Controller("/sagiri")
export class SagiriController extends ApiController {

    @SendsResponse()
    @HttpPost("/get_source")
    async getSource() {
        const req: express.Request = this.request;
        const res: express.Response = this.response;
        const data = req.body.image_data.replace(/^data:image\/png;base64,/, "");
        const rawBuffer = new Buffer(data, "base64");
        const returned = await sauceClient.getSource(rawBuffer || req.body.image_data);

        res.setHeader("content-type", "application/json");
        return returned;
    }
}
