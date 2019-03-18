// Copyright 2019 (c) Clarity Operations LLC
// Licensed under MIT
import { Post } from 'src/entities/post.entity';

export class AyaCollectionDto {
    readonly title: string;
    readonly posts: Post[];
}
