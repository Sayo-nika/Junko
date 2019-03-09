// Copyright 2019 (c) Clarity Operations LLC
// 
// Licensed under MIT.

import { ConnectionOptions } from "typeorm";

export interface Config {
    db: ConnectionOptions,
    sauceNaoKey: string,
    owoKey: string
}