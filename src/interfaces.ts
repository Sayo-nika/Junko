import { DatabaseType } from "typeorm";

// Copyright 2019 (c) Clarity Operations LLC
// 
// Licensed under MIT.

export interface Config {
    db: {
        type: DatabaseType,
        host: string,
        port: number,
        username: string,
        password: string,
        database: string
    },
    sauceNaoKey: string,
    owoKey: string
}