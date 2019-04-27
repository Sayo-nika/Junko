// Copyright 2019 (c) Clarity Operations LLC
// 
// Licensed under MIT.
import {Model, Association} from 'sequelize';
import { User } from './user';


export class Post extends Model {
    public id!: number;
    public caption!: string;
    public source!: string;

    public readonly submittedAt!: Date;
    public readonly submittedBy!: Association<User>;
}