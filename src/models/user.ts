// Copyright 2019 (c) Clarity Operations LLC
// 
// Licensed under MIT.
import {Model, Association, HasManyGetAssociationsMixin, DataTypes} from 'sequelize';
import { Post } from './post';
import {sequelize} from '../app';

export class User extends Model {
    public id!: number;
    public name!: string;

    public readonly posts?: Post[];

    public static associations: {
        posts: Association<User, Post>;
    }
    
    // get all posts
    public getPosts: HasManyGetAssociationsMixin<Post>;
}

User.init({
    id: {
        type: new DataTypes.INTEGER.UNSIGNED(),
        autoIncrement: true,
        primaryKey: true
    },
    name: {
       type: new DataTypes.STRING()
    }
}, {
    sequelize,
    tableName: 'users'
});