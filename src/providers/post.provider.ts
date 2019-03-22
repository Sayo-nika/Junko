// Copyright 2019 (c) Clarity Operations LLC
// Licensed under MIT
import { Connection } from 'typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { Collection } from 'src/entities/collection.entity';

export const postProviders = [
    {
        provide: 'POST_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(PostEntity),
    },
    {
        provide: 'COLLECTION_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Collection),
    },
];
