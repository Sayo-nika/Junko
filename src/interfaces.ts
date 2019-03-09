import { DatabaseType, ConnectionOptions } from "typeorm";

// Copyright 2019 (c) Clarity Operations LLC
// 
// Licensed under MIT.

export interface Config {
    db: ConnectionOptions,
    sauceNaoKey: string,
    owoKey: string
}