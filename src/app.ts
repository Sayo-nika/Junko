// Copyright 2019 (c) Clarity Operations LLC
// 
// Licensed under MIT.

import express = require("express");
import {Dino} from "dinoloop";
import bodyParser = require("body-parser");
import { ContentController } from "./controllers/content-controller";
import { SagiriController } from "./controllers/sagiri-controller";
import "reflect-metadata";
import * as fs from "fs";
import * as YAML from "yamljs";
import { Config } from "./interfaces";
import { createConnection } from "typeorm";

const app: express.Application = express();
const port = process.env.FRANCHOUCHOU_PORT || 2018;
const configFile = fs.readFileSync("./config.json" || "./config.yml", {encoding: "utf8"});

//export this so we can use the config.
export const config: Config = YAML.parse(configFile);
export const connection = async () => await createConnection(config.db);

app.use(bodyParser.json());

const dino = new Dino(app, "/api");

dino.useRouter(() => express.Router());
dino.registerController(ContentController);
dino.registerController(SagiriController);
dino.bind();


app.listen(port, () => console.log(`Junko started on port ${port}`));