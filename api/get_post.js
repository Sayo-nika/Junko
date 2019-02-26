/**
 * Copyright 2019 (c) Capuccino, et al.
 * 
 * Licensed under MIT
 */


/**
 * Turns a regular JavaScript object into a stringified JSON
 * @param {Object} i the JS Object to JSON-ify  
 */
const jsonify = i => JSON.stringify(i);


module.exports = async (req, res) => {
    if (req.method !== "GET") {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(jsonify({code: "400", message: "this endpoint is for GETs only"}));
    }

    // needed so we can parse the ID.
    const reqID = req.url.split("/").pop();
    
    res.statusCode = 503;
    res.setHeader("Content-Type", "application/json");
    res.end(jsonify({code: "503", message: "This endpoint is a Work in Progress"}));
}