import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { PostCollection } from "./post-collection";

/**
 * A class that defines a Post.
 * Posts are the basic element of the booru, containing the image URL, the title/caption, and a optional source URL.
 */
@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    title: string;

    @Column()
    url: string;

    // this would be selected from sagiri data btw.
    @Column()
    source?: string;

    @ManyToOne(type => PostCollection, collection => PostCollection)
    collections: PostCollection[];

}