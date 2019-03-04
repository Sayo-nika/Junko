import {Handler} from 'sagiri';
import express = require("express");
import {Controller, ApiController, HttpPost, SendsResponse } from 'dinoloop';

const sauceClient: Handler = new Handler(process.env.FRANCHOUCHOU_SAUCENAO_KEY, {numRes: 2, getRating: true});

@Controller("/sagiri")
export class SagiriController extends ApiController {

    @SendsResponse()
    @HttpPost("/get_source")
    async getSource() {
        const req: express.Request = this.request;
        const res: express.Response = this.response;
        const data = req.body.imageData.replace(/^data:image\/png;base64,/, "");
        const rawBuffer = new Buffer(data, "base64");
        const returned = await sauceClient.getSource(rawBuffer);

        res.setHeader("content-type", "application/json");
        return returned;
    }
}
