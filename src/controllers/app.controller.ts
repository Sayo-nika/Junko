import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Post } from 'src/entities/post.entity';
import { Collection } from 'src/entities/collection.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPosts(): Promise<Post[]> {
    return this.appService.returnAllPosts();
  }

  @Get()
  getCollections(): Promise<Collection[]> {
    return this.appService.returnAllCollections();
  }
}
