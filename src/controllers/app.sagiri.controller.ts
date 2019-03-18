// Copyright 2019 (c) Clarity Operations LLC
// Licensed under MIT
import { Controller, Body, Post } from '@nestjs/common';
import { SagiriService } from 'src/services/sagiri.service';
import { SagiriPostDto } from 'src/dto/sagiri-post.dto';

@Controller('sagiri')
export class SagiriController {
  constructor(private readonly sagiriService: SagiriService) {}

  @Post()
  getSource(@Body() req: SagiriPostDto) {
      return this.sagiriService.getSource(req.imageData);
  }
}
