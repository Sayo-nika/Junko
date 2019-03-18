// Copyright 2019 (c) Clarity Operations LLC
// Licensed under MIT.
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Collection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 500})
    title: string;

    @OneToMany(type => Post, post => post.inCollections)
    posts: Post[];
}
