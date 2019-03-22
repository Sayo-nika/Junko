import { Controller, Get, Body, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { PostEntity } from 'src/entities/post.entity';
import { Collection } from 'src/entities/collection.entity';
import { AyaPostDto } from 'src/dto/aya-post.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPosts(): Promise<PostEntity[]> {
    return this.appService.returnAllPosts();
  }

  @Get()
  getCollections(): Promise<Collection[]> {
    return this.appService.returnAllCollections();
  }

  @Post()
  getSource(@Body() req: AyaPostDto) {
      this.appService.submitPost(req);
      return '';
  }
}
