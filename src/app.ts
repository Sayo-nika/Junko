/*
 * Copyright 2019 (c) Clarity Operations LLC. All Rights Reserved.
 * 
 * This work is licensed under MIT License.
 */
import express = require("express");
import {Dino} from "dinoloop";
import bodyParser = require("body-parser");
import { ContentController } from "./controllers/content-controller";

const app: express.Application = express();
const port = process.env.FRANCHOUCHOU_PORT || 2018;

app.use(bodyParser.json());

const dino = new Dino(app, "/api");

dino.useRouter(() => express.Router());
dino.registerController(ContentController);
dino.bind();


app.listen(port, () => console.log(`Junko started on port ${port}`));