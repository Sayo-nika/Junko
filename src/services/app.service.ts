// Copyright 2019 (c) Clarity Operations LLC
// Licensed under MIT
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
