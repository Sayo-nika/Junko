// Copyright 2019 (c) Clarity Operations LLC
// Licensed under MIT.
import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity()
export class Collection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 500})
    title: string;

    @OneToMany(type => PostEntity, post => post.inCollections)
    posts: PostEntity[];
}
