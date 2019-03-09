// Copyright 2019 (c) Clarity Operations LLC
// 
// Licensed under MIT.

export interface Config {
    db: {
        host: string
        user: string,
        password: string
    },
    sauceNaoKey: string,
    owoKey: string
}