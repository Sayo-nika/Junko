// Copyright 2019 (c) Clarity Operations LLC
// Licensed under MIT
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from 'src/entities/post.entity';
import owo = require('owo.js');
import { config } from 'src/main';
import { Collection } from 'src/entities/collection.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('POST_REPOSITORY')
    private readonly postRepository: Repository<PostEntity>,

    @Inject('COLLECTION_REPOSITORY')
    private readonly collectionRepository: Repository<Collection>,
  ) {}

  async returnAllPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find();
  }

  async returnAllCollections(): Promise<Collection[]> {
    return await this.collectionRepository.find();
  }

  async returnPost(id: number): Promise<PostEntity[]> {
    return await this.postRepository.find({id});
  }

  async returnCollection(id: number): Promise<Collection[]> {
    return await this.collectionRepository.find({id});
  }

  async submitPost(payload) {
    const submission = new PostEntity();
    const subUpload = new owo(config.key);

    submission.caption = payload.caption;
    submission.url = await subUpload.upload(Buffer.from(payload.img_data.replace(/^data:image\/png;base64,/, '')), 'base64');

    await this.postRepository.save(submission);
  }

  async submitCollection(payload) {
    const submission = new Collection();

    submission.title = payload.title;
    submission.posts = payload.posts;

    await this.collectionRepository.save(submission);
  }
}
