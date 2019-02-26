/**
 * Copyright 2019 (c) Capuccino, et al.
 * 
 * Licensed under MIT
 */

const owo = new(require("owo.js"))(process.env.JUNKO_OWO_TOKEN);
const {json} = require("micro");

/**
 * Turns a regular JavaScript object into a stringified JSON
 * @param {Object} i the JS Object to JSON-ify  
 */
const jsonify = i => JSON.stringify(i);


module.exports = async (req, res) => {
    if (req.method !== "POST") {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(jsonify({code: "400", message: "This endpoint only accepts POST requests."}));        
    }

    let payload = await json(req);
    let imageData = payload.image_data;
    let rawBufferImgData = new Buffer(imgData, 'base64').toString('binary');

    owo.upload(rawBufferImgData).then(d => {
        //now this is where the fun starts
        // do nothing for now.
    }).catch(e => {
        // return plaintext error.
        res.statusCode = 500;
        res.end(e);
    });
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    res.end(jsonify({code: "503", message: "This endpoint is a Work in Progress"}));
}