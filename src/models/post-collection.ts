import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Post } from "./post";

/**
* A class that defines a "collection".
* Collection in layman's terms is a column that contains sets of posts. Its a ManyToOne relationship
*/
@Entity()
export class PostCollection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    title: string;

    @OneToMany(type => Post, post => Post)
    images: Post[];
}