// Copyright 2019 (c) Clarity Operations LLC
// Licensed under MIT.
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from 'typeorm';
import { Collection } from './collection.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 500})
    caption: string;

    @ManyToMany(type => Collection, collection => collection.posts)
    inCollections: Collection[];
}
